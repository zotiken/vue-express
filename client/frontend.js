import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js";
new Vue({
  el: "#App",
  data() {
    return {
      form: {
        name: "",
        value: "",
      },
      contacts: [],
    };
  },
  computed: {
    CheckForm() {
      return this.form.name.trim() && this.form.value.trim();
    },
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;
      const response = await requested("/api/contacts", "POST", { ...contact });
      this.contacts = await response;
      // this.contacts.push({ ...contact, id: Date.now(), marker: false });
      this.form.name = this.form.value = "";
    },
    async markContact(param) {
      const select = this.contacts.filter((er) => param === er.id);
      const response = await requested(`/api/contacts/${param}`, "PUT", {
        ...select[0],
        marker: true,
      });
      select[0].marker = response.marker;
    },
    async delContact(param) {
      this.contacts = this.contacts.filter((er) => param !== er.id);
      await requested(`/api/contacts/${param}`, "DELETE");
    },
  },
  async mounted() {
    this.contacts = await requested("/api/contacts");
  },
});

async function requested(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn("ERROR", e.message);
  }
}
