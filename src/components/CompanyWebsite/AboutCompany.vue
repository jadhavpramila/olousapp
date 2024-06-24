<template>
  <div class="">
    <div class="bg-[#fff]" v-if="allCompanyData">
      <div class="text-[#000000] text-subtitle font-bold">About Us</div>
      <div>
        <!-- <div>
          <h1 class="text-lg text-white font-medium">About Company</h1>
        </div> -->
        <div class="mt-2.5">
          <p
            class="text-sm text-normal leading-[1.43] font-extralight"
            :innerHTML="setAboutText(allCompanyData)"
          >
            <!-- {{ allCompanyData.long_description }} -->
          </p>
        </div>
      </div>
      <div class="mt-4" v-if="allCompanyData.contacts.length > 0">
        <div>
          <h1 class="text-subtitle font-bold">Contacts</h1>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div
            class="grid"
            v-for="(contact, index) in getContacts(allCompanyData.contacts)"
            :key="index"
          >
            <div
              v-if="contact.contact_type == 0"
              class="app-bg-color-gradient app-comp-box-shadow rounded-xl p-5"
            >
              <p class="text-subtitle font-bold mb-1">
                {{ contact.name }}
              </p>
              <p class="text-normal mb-4">
                {{ contact.designation }}
              </p>
              <ul class="text-normal">
                <li>
                  <a :href="`tel:${setFullContactNo(contact)}`"
                    ><img
                      src="../../assets/Call-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />

                    {{ setFullContactNo(contact) }}</a
                  >
                </li>
                <li>
                  <a :href="`mailto:${contact.email}`">
                    <img
                      src="../../assets/Email-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />
                    {{ contact.email }}</a
                  >
                </li>
                <li v-if="allCompanyData.city && allCompanyData.country">
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ allCompanyData.city }}, {{ allCompanyData.country }}
                </li>
                <li v-else>
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ contact.city }}, {{ contact.country }}
                </li>
              </ul>
            </div>
            <div
              v-else
              class="app-bg-color-gradient app-comp-box-shadow rounded-xl p-5"
            >
              <p class="text-sm font-extralight mb-2 app-text-color-secondary">
                {{ contact.name }}
              </p>
              <ul class="text-sm font-extralight app-text-color-secondary">
                <li>
                  <a :href="`tel:${setFullContactNo(contact)}`"
                    ><img
                      src="../../assets/Call-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />

                    {{ setFullContactNo(contact) }}</a
                  >
                </li>
                <li>
                  <a :href="`mailto:${contact.email}`">
                    <img
                      src="../../assets/Email-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />
                    {{ contact.email }}</a
                  >
                </li>
                <li v-if="allCompanyData.city && allCompanyData.country">
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ allCompanyData.city }}, {{ allCompanyData.country }}
                </li>
                <li v-else>
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ contact.city }}, {{ contact.country }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-10">
        <div class="mb-2">
          <h1 class="text-lg text-white font-medium">Clients</h1>
        </div>
        <div class="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5">
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
          <div class="bg-[#ffffff] h-[4rem] rounded-lg"></div>
        </div>
      </div>
      <div class="mt-10">
        <div class="mb-2">
          <h1 class="text-lg text-white font-medium">Testimonials</h1>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <Testimonial />
        </div>
      </div>
      <div class="mt-10">
        <div class="mb-2">
          <h1 class="text-lg text-white font-medium">Social</h1>
        </div>
        <div>
          <div class="flex">
            <a
              href="https://www.facebook.com/OlousApp"
              target="_blank"
              class="m-4 ml-0"
              ><img
                src="../../assets/Facebook-AboutCompany.svg"
                alt="Facebook_Olous"
            /></a>
            <a
              href="https://www.instagram.com/olous_app/"
              target="_blank"
              class="m-4"
              ><img
                src="../../assets/Instagram-AboutCompany.svg"
                alt="Instagram_Olous"
            /></a>
            <a
              href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
              target="_blank"
              class="m-4"
              ><img
                src="../../assets/Youtube-AboutCompany.svg"
                alt="Youtube_Olous"
            /></a>
            <a
              href="https://www.linkedin.com/company/olous-app"
              target="_blank"
              class="m-4"
              ><img
                src="../../assets/Linkdine-AboutCompany.svg"
                alt="Linkedin_Olous"
            /></a>
            <a href="https://twitter.com/app_olous" target="_blank" class="m-4"
              ><img
                src="../../assets/Twitter-AboutCompany.svg"
                alt="Twitter_Olous"
            /></a>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Testimonial from "/src/components/CompanyWebsite/Testimonial.vue";
import appConstants from "../../appConstants";

export default {
  name: "AboutCompany",
  components: {
    Testimonial,
  },
  props: {
    allCompanyData: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    let allContacts = ref([]);
    let contactType = appConstants.contact_type;

    allContacts.value = props.allCompanyData.contacts;
    //console.log("contacts", allContacts);
    function setAboutText(allCompanyData) {
      if (
        allCompanyData.hasOwnProperty("long_description") &&
        allCompanyData.long_description != ""
      ) {
        return allCompanyData.long_description.replace(/\n/g, "<br />");
      }

      return "";
    }
    function setFullContactNo(contact) {
      let phoneNumber = "+" + contact.code + contact.phone;

      //console.log("Conatcts", phoneNumber);
      return phoneNumber;
    }
    function getContacts(contactData) {
      let contactTypeZero = [];
      let contactTypeOne = [];
      if (contactData.length > 0) {
        for (let i = 0; i < contactData.length; i++) {
          if (contactData[i].contact_type == contactType.USER) {
            contactTypeZero.push(contactData[i]);
          } else if (contactData[i].contact_type == contactType.COMPANY) {
            contactTypeOne.push(contactData[i]);
          }
        }
      }
      if (contactTypeZero.length > 0) {
        return contactTypeZero;
      } else {
        return contactTypeOne;
      }
    }

    return {
      allContacts,
      setAboutText,
      setFullContactNo,
      getContacts,
      contactType,
    };
  },
};
</script>
