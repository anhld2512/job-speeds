import moment from "moment"
import 'moment/dist/locale/vi';

import filters from "./common/filters";
import util from "./common/util";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      filters: filters,
      util: util,
      moment: moment
    }
  }
})