import moment from "moment"
import 'moment/dist/locale/vi';

import filters from "./common/filters"
import util from "./common/util"
import utilClient from "./common/util.client"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      filters: filters,
      util: { ...util, ...utilClient },
      moment: moment
    }
  }
})