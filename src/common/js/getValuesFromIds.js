import store from "../../store";
import appConstants from "../../appConstants";

export function getInterestValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getInterest")
      .then(() => {
        let getter_interest = store.getters["dropdown/getter_interest"];

        if (id_list == "" || id_list == null || id_list.length == 0) {
          return "";
        }
        let InterestValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_interest.map((options) => {
            if (options.id == selected) {
              InterestValues.push(options.display_string);
            }
          });
        });

        let strValue = InterestValues.join(", ");
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}

export function getSectorValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getSectorDetails")
      .then(() => {
        let getter_sector = store.getters["dropdown/getter_sector"];

        if (id_list == "" || id_list == null ||id_list.length == 0) {
          return "";
        }
        let SectorValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_sector.map((options) => {
            if (options.id == selected) {
              SectorValues.push(options.display_string);
            }
          });
        });

        let strValue = SectorValues.join(", ");
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}

export function getProfessionValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getProfessionDetails")
      .then(() => {
        let getter_profession = store.getters["dropdown/getter_profession"];

        if (id_list == "" || id_list == null ||id_list.length == 0) {
          return "";
        }
        let ProfessionValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_profession.map((options) => {
            if (options.id == selected) {
              ProfessionValues.push(options.display_string);
            }
          });
        });

        let strValue = ProfessionValues.join(", ");
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}

export function getCategoryValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getCategoryData")
      .then(() => {
        let getter_category = store.getters["dropdown/getter_category"];

        if (id_list == "" || id_list == null || id_list.length == 0) {
          return "";
        }
        let categoryValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_category.map((options) => {
            if (options.id == selected) {
              categoryValues.push(options.name);
            }
          });
        });

        let strValue = categoryValues.join(", ");
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}

export function getSubCategoryValues(categoryId, id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getSubCategories", categoryId)
      .then(() => {
        let getter_category = store.getters["dropdown/getter_subcategory"];

        if (id_list == "" || id_list == null || id_list.length == 0) {
          return "";
        }
        let subcategoryValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_category.map((options) => {
            if (options.id == selected) {
              subcategoryValues.push(options.name);
            }
          });
        });

        let strValue = subcategoryValues.join(", ");
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}
export function getLanguagesValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("dropdown/action_getLanguages")
      .then(() => {
        let getter_languages = store.getters["dropdown/getter_languages"];

        if (id_list == "" || id_list == null ||id_list.length == 0) {
          return "";
        }
        let LanguagesValues = [];
        id_list.map((res) => {
          let selected = res;

          getter_languages.map((options) => {
            if (options.id == selected) {
              LanguagesValues.push(options.display_string);
            }
          });
        });

        let strValue = LanguagesValues.join(", ");
      //  console.log(strValue)
        resolve(strValue);
      })
      .catch(() => {
        reject("");
      });
  });
}

function getString(id_list, options_to_match, match_key_name) {
  try {
    if (id_list == '' || id_list == null || id_list.length == 0) {
      return ''
    }
    let SectorValues = []
    id_list.map((res) => {
      let selected = res

      options_to_match.map((options) => {
        if (options.id == selected) {
          SectorValues.push(options[match_key_name])
        }
      })
    })

    let strValue = SectorValues.join(', ')
    return strValue
  } catch (error) {
    return ''
  }
}

export function minWorkValueStr(min_work_id) {
  let min_work_id_options = appConstants.min_work_options
  let result = getString([min_work_id], min_work_id_options, 'name')
  return result
}

export function getTurnOverOptionsString(id_list) {
  let company_turnover_options = appConstants.company_turnover_options
  let result = getString([id_list], company_turnover_options, 'name')
  return result
}

export function getLeadProjectTypeString(id_list) {
  let company_turnover_options = appConstants.lead_project_type
  let result = getString([id_list], company_turnover_options, 'value')
  return result
}

export function getLeadAppxAreaString(id_list) {
  let company_turnover_options = appConstants.lead_appx_area
  let result = getString([id_list], company_turnover_options, 'value')
  return result
}

export function getTypeOfContractString(id_list) {
  let company_turnover_options = appConstants.lead_type_of_contract_0ptions
  let result = getString([id_list], company_turnover_options, 'value')
  return result
}

export function getContractorShouldHaveDoneString(id_list) {
  let company_turnover_options = appConstants.contractor_should_have_done
  let result = getString([id_list], company_turnover_options, 'value')
  return result
}