<template>
  <div class="cls-conversationCard">
    <div class="py-[8px]">
      <div class="flex flex-row items-center">
        <div class="flex-shrink-0">
          <div class="flex justify-center">
            <div v-if="conversation.profile_pic" class="lg:w-9 lg:h-9 h-9 w-9">
              <VLazyImage
                class="rounded-full"
                :src="conversation.profile_pic"
                alt=""
              />
            </div>
            <div v-else>
              <div
                class="rounded-full text-[#3a3a41] flex lg:w-9 lg:h-9 h-9 w-9 justify-center items-center relative bg-[#d8d8d8] cursor-pointer"
              >
                <span> {{ shortForm() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grow w-full pl-[0.625rem] pr-1 overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
        >
          <h1
            class="text-base font-size-16 font-weight-600 text-[#000000] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ conversation.name }}
          </h1>
          <span class="font-light text-sm text-[#000000]">
            {{ getLastMessage() }}
          </span>
        </div>
        <div class="flex flex-col items-end flex-shrink-0">
          <span class="text-xs text-[#707070]">{{ getMessageSentTime() }}</span>
          <div
            v-if="getUnreadMessageCount() > 0"
            class="h-5 w-5 bg-[#c9c9c9] rounded-full flex justify-center items-center"
          >
            <span class="text-xs text-[#333333]"
              >{{ getUnreadMessageCount() }}
            </span>
          </div>
          <!-- <div class="">
            <Badge value="5" class="h-5 w-5 gray-badge"></Badge>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import VLazyImage from "v-lazy-image";
import Badge from "primevue/badge";

export default {
  name: "ConversationCard",
  components: {
    VLazyImage,
    Badge,
  },
  props: {
    conversation: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const store = useStore();
    let getter_user = computed(() => store.getters["login/getter_user"]);

    function getMessageSentTime() {
      let last_msg_Date = moment
        .utc(props.conversation.last_message.created_at)
        .local()
        .format("L");
      let current_date = moment().format("L");
      if (last_msg_Date == current_date) {
        // console.log("same")
        return moment
          .utc(props.conversation.last_message.created_at)
          .local()
          .format("LT");
      } else {
        let last_message_year = moment
          .utc(props.conversation.last_message.created_at)
          .local()
          .format("YYYY");
        //if same year
        if (last_message_year == moment().format("YYYY")) {
          // console.log("Different")
          return moment
            .utc(props.conversation.last_message.created_at)
            .local()
            .format("DD MMM");
        } else {
          // console.log("Different")
          return moment
            .utc(props.conversation.last_message.created_at)
            .local()
            .format("DD/MM/YYYY");
        }
      }
    }

    // function setVisibilityOfAcceptButton() {
    //   if (props.conversation.is_accepted) {
    //     return false;
    //   } else {
    //     if (props.conversation.created_by == getter_user.value.id) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // }

    function shortForm() {
      let initialLetters = "";

      if (props.conversation.name) {
        const myArray = props.conversation.name.split(" ");
        if (myArray.length > 1) {
          initialLetters =
            myArray[0].charAt(0).toUpperCase() +
            myArray[1].charAt(0).toUpperCase();
        }
      }
      return initialLetters;
    }

    function getLastMessage() {
      let msg = props.conversation.last_message.message_str;
      return msg;
    }

    // function acceptConversation() {
    //   store.dispatch(
    //     "messaging/action_acceptConversation",
    //     props.conversation.uid
    //   );
    // }

    function getUnreadMessageCount() {
      let returnValue;

      let member = props.conversation.members.find(
        (x) => x.id == getter_user.value.id
      );
      if (member != undefined) {
        if (member.unread_count > 0) {
          if (member.unread_count > 10) {
            return "10+";
          } else {
            return member.unread_count;
          }
        } else {
          return 0;
        }
      }
      console.log("returnValue", returnValue);
    }

    return {
      getMessageSentTime,
      // setVisibilityOfAcceptButton,
      shortForm,
      getLastMessage,
      // acceptConversation,
      getUnreadMessageCount,
    };
  },
};
</script>

<style>
.show-ellipsis {
  text-overflow: ellipsis;
}

.gray-badge {
  background: #3a3a41;
  font-weight: 400;
}
.cls-conversationCard:hover {
  background-color: #e8e8e8;
}
</style>
