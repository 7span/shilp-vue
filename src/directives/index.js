import {
  open as modalOpenDirective,
  close as modalCloseDirective,
} from "./modal";
import { loader as loaderDirective } from "./loader";

export default (Vue) => {
  Vue.directive("shilp-modal-open", modalOpenDirective);
  Vue.directive("shilp-modal-close", modalCloseDirective);
  Vue.directive("shilp-loader", loaderDirective);
};
