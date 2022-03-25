import Vue from "vue";

/**
 * Vee Validate
 */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";

const rules = { required, email, min, max };

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule], // add its message
  });
}

extend("url", {
  validate: (value) => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    return value.match(new RegExp(regex));
  },
});

extend("slug", {
  validate: (value) => {
    const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/gi;
    return value.match(new RegExp(regex));
  },
});

extend("positiveNonZeroInteger", {
  validate: (value) => {
    if (value <= 0) {
      return "Value must be positive";
    }
    if (value % 1 !== 0 || (value.includes && value.includes("."))) {
      return "Value shouldn't be decimal";
    }
    return true;
  },
});

extend("positiveNonZeroFloat", {
  validate: (value) => {
    if (parseFloat(value) <= 0) {
      return "Value must be positive";
    }
    return true;
  },
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

extend("positiveFloat", {
  validate: (value) => {
    if (value < 0) {
      return "Value must be positive";
    }
    return true;
  },
});

extend("domain", {
  validate: (value) => {
    if (
      value.startsWith("http:") ||
      value.startsWith("https:") ||
      value.startsWith("www.") ||
      value.startsWith(".")
    ) {
      return "Domain should not start with 'http', 'www' or '.'";
    }

    if (value.includes("/")) {
      return "Domain should not contain any '/'";
    }

    if (value.endsWith(".")) {
      return "Domain should not end with '.'";
    }

    if (value.indexOf(" ") >= 0) {
      return "Domain should not contain any space.";
    }

    if (value.indexOf(".") < 0) {
      return "Domain must contain a single '.'";
    }

    return true;
  },
});

extend("subdomain", {
  validate: (value) => {
    if (value == "www") {
      return "No need to add www as subdomain.";
    }

    if (value.indexOf(" ") >= 0) {
      return "Subdomain should not contain any space.";
    }

    if (value.includes("/")) {
      return "Subdomain should not contain any '/'";
    }

    if (value.indexOf(".") >= 0) {
      return "Subdomain can't contain any '.'";
    }

    return true;
  },
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
