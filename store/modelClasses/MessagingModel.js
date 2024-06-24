import { User } from "./UserProfileModel.js";
import store from "../../store";
import appConstants from "../../appConstants.js";
import moment from "moment";
import { getUUID } from "../../common/js/commonFunctions.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
class Member {
  id = "";
  unread_count = 0;
  joining_date = "";
  status = appConstants.messaging_user_status.ACTIVE;
  last_message_id = "";
  conversation_updated_at = "";
  user = {};

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.unread_count = data.unread_count == undefined ? 0 : data.unread_count;
    this.joining_date = data.joining_date == undefined ? "" : data.joining_date;
    this.status = data.status == undefined ? 0 : data.status;
    this.last_message_id =
      data.last_message_id == undefined ? "" : data.last_message_id;
    this.conversation_updated_at =
      data.conversation_updated_at == undefined
        ? ""
        : data.conversation_updated_at;
  }
}

class MessageDetails {
  data = "";
  sender = "";
  members = [];

  constructor(data) {
    this.data = data.data == undefined ? "" : data.data;
    this.sender = data.sender == undefined ? "" : data.sender;
    this.members = data.members == undefined ? [] : data.members;
  }
}

export class Conversation {
  uid = "";
  encrpted_uid = "";
  created_at = "";
  name = ""; //In OTO chat Name of partner & in group group name
  profile_pic = ""; //In OTO chat pic of partner & in group group pic
  tagline = ""; //In OTO chat tagline of partner & in group group tagline
  slug = ""; //In OTO chat slug of partner in group no slug
  group = false;
  admins = [];
  members = [];
  created_by = "";
  is_accepted = false;
  status = appConstants.conversation_status.PENDING;
  blocked_by = "";

  // last_message_uid = "";
  // last_message = {};
  // last_message_type = 0;
  // last_message_attachment_id = [];

  // last_message_sender_id = "";

  last_message_sender = "";
  last_message = "";
  // last_message_date = "";
  // last_message_str = "";

  conversation_with = {};
  users_list = [];

  available_dropdown_options = {
    delete: {
      display_name: "Delete Conversation",
      id: "delete",
    },
    block: {
      display_name: "Block",
      id: "block",
    },
    unblock: {
      display_name: "Unblock",
      id: "unblock",
    },
  };
  user_dropdown_options = [];

  constructor(data, user_details, user_last_msg) {
    let getter_user = store.getters["login/getter_user"];

    this.uid = data.uid == undefined ? "" : data.uid;
    this.encrpted_uid =
      data.uid == undefined ? "" : getUUIDtoEncodedString(data.uid);
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.name = data.name == undefined ? "" : data.name;
    this.profile_pic = data.profile_pic == undefined ? "" : data.profile_pic;
    this.group = data.group == undefined ? false : data.group;
    // this.admins = data.admins == undefined ? [] : data.admins;

    //get admins
    if (data.admins == undefined) {
      this.admins = [];
    } else {
      for (let member of data.admins) {
        var single_admin = [];
        single_admin = user_details.filter(function (el) {
          return el.user_id == member;
        });

        if (single_admin.length > 0) {
          let user_obj = new Message_User(single_admin[0]);
          this.admins.push(user_obj);
        }
      }
    }

    //get members
    if (data.members == undefined) {
      this.members = [];
    } else {
      for (let member of data.members) {
        var single_member = [];
        single_member = user_details.filter(function (el) {
          return el.user_id == member.id;
        });

        if (single_member.length > 0) {
          let user_obj = new Message_User(single_member[0]);
          let member_obj = new Member(member);
          member_obj.user = user_obj;
          this.users_list.push(user_obj);
          this.members.push(member_obj);
        }
      }
    }

    this.created_by = data.created_by == undefined ? "" : data.created_by;
    this.is_accepted = data.is_accepted == undefined ? false : data.is_accepted;
    this.status =
      data.status == undefined
        ? appConstants.conversation_status.PENDING
        : data.status;
    this.blocked_by = data.blocked_by == undefined ? "" : data.blocked_by;
    // this.last_message_uid =
    //   data.last_message_uid == undefined ? "" : data.last_message_uid;
    // this.last_message =
    //   data.last_message == undefined
    //     ? new MessageDetails()
    //     : new MessageDetails(data.last_message);
    // this.last_message_type =
    //   data.last_message_type == undefined ? "" : data.last_message_type;
    // this.last_message_sender_id =
    //   data.last_message_sender_id == undefined
    //     ? ""
    //     : data.last_message_sender_id;

    // this.last_message_date =
    //   data.last_message_date == undefined ? "" : data.last_message_date;
    // this.last_message_attachment_id =
    //   data.last_message_attachment_id == undefined
    //     ? []
    //     : data.last_message_attachment_id;
    // this.last_message_str =
    //   data.last_message_str == undefined ? "" : data.last_message_str;

    //set conversation last message
    let last_message_id = "";
    let current_member = [];
    current_member = this.members.filter(function (el) {
      return el.id == getter_user.id;
    });

    if (current_member.length > 0) {
      last_message_id = current_member[0].last_message_id;
    }

    var last_msg_array = [];
    last_msg_array = user_last_msg.filter(function (el) {
      return el.uid == last_message_id;
    });

    if (last_msg_array.length > 0) {
      let last_message_obj = new Message(last_msg_array[0], user_details);
      this.last_message = last_message_obj;
    }

    //get last message sender
    if (this.last_message == "") {
      this.last_message_sender = "";
    } else {
      let last_msg_sender_id = this.last_message.sender_id;
      var last_msg_sender = [];
      last_msg_sender = user_details.filter(function (el) {
        return el.user_id == last_msg_sender_id;
      });

      if (last_msg_sender.length > 0) {
        let user_obj = new Message_User(last_msg_sender[0]);
        this.last_message_sender = user_obj;
      }
    }

    if (this.group) {
      this.conversation_with = {};
      let activeMember = activeMembers(this.members);
      if (this.name == "") {
        let membersName = [];
        for (let member of activeMember) {
          membersName.push(
            `${member.user.first_name} ${member.user.last_name}`
          );
        }

        this.name = membersName.join();
      }
      this.tagline = `${activeMember.length} people in this conversation`;
      this.profile_pic = `${
        import.meta.env.VITE_APP_S3_STATIC_IMAGES
      }Group_Chat_Icon.svg`;
    } else {
      let conversation_with = this.members.filter(function (el) {
        return el.user.id != getter_user.id;
      });

      if (conversation_with.length > 0) {
        this.conversation_with = conversation_with[0].user;
        this.name = `${this.conversation_with.first_name} ${this.conversation_with.last_name}`;
        this.profile_pic = this.conversation_with.profile_image;
        this.tagline = this.conversation_with.about;
        this.slug = this.conversation_with.slug;
      }
    }

    Conversation.calculateDropdownOptions(this);
  }

  activeMembers(members) {
    let active_members = members.filter(function (el) {
      return el.user.status == appConstants.messaging_user_status.ACTIVE;
    });

    return active_members.user;
  }

  static acceptConversation(conversation) {
    conversation.is_accepted = true;
  }

  static blockConversation(conversation) {
    let getter_user = store.getters["login/getter_user"];
    conversation.status = appConstants.conversation_status.BLOCKED;
    conversation.blocked_by = getter_user.id;
    Conversation.calculateDropdownOptions(conversation);
  }

  static unblockConversation(conversation) {
    conversation.status = appConstants.conversation_status.ACCEPTED;
    conversation.blocked_by = "";
    Conversation.calculateDropdownOptions(conversation);
  }

  static calculateDropdownOptions(conversation) {
    let getter_user = store.getters["login/getter_user"];
    conversation.user_dropdown_options = [];
    conversation.user_dropdown_options.length = 0;

    conversation.user_dropdown_options.push(
      conversation.available_dropdown_options.delete
    );

    switch (conversation.status) {
      case appConstants.conversation_status.BLOCKED:
        if (conversation.blocked_by == getter_user.id)
          conversation.user_dropdown_options.push(
            conversation.available_dropdown_options.unblock
          );
        break;
      case appConstants.conversation_status.ACCEPTED:
        conversation.user_dropdown_options.push(
          conversation.available_dropdown_options.block
        );
        break;
      case appConstants.conversation_status.PENDING:
        conversation.user_dropdown_options.push(
          conversation.available_dropdown_options.block
        );
        break;
    }
  }

  static setUnreadCountZero(conversation) {
    let getter_user = store.getters["login/getter_user"];
    let current_user_id = getter_user.id;
    let member = conversation.members.find((x) => x.id == current_user_id);
    if (member != undefined) {
      member.unread_count = 0;
    }
  }
}

export class Message {
  uid = "";
  created_at = "";
  message = {};
  type = 0;
  attachment_id = [];
  sender_id = "";
  conversation_id = [];
  tagged_users = [];
  message_to = [];
  read_by = [];
  message_str = "";
  sender_user = {};
  sent = null;
  media = [];

  constructor(data, user_details) {
    this.uid = data.uid == undefined ? "" : data.uid;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.message =
      data.message == undefined
        ? new MessageDetails("")
        : new MessageDetails(data.message);
    this.type = data.type == undefined ? 0 : data.type;
    this.attachment_id =
      data.attachment_id == undefined ? [] : data.attachment_id;
    this.sender_id = data.sender_id == undefined ? "" : data.sender_id;
    this.conversation_id =
      data.conversation_id == undefined ? "" : data.conversation_id;
    this.tagged_users = data.tagged_users == undefined ? [] : data.tagged_users;
    this.message_to = data.message_to == undefined ? [] : data.message_to;
    this.read_by = data.read_by == undefined ? [] : data.read_by;
    this.message_str = data.message_str == undefined ? "" : data.message_str;
    this.sent = data.uid == undefined || "" ? false : true;

    if (this.sender_id == "") {
      this.sender_user = {};
    } else {
      let sender_details = [];
      sender_details = user_details.filter(function (el) {
        return el.user_id == data.sender_id;
      });

      if (sender_details.length > 0) {
        let user_obj = new Message_User(sender_details[0]);
        this.sender_user = user_obj;
      }
    }
    if (
      data.media !== null &&
      data.media != undefined &&
      data.media.length > 0
    ) {
      for (let media of data.media) {
        if (typeof media === "object") {
          this.media.push(new message_media(media));
        }
      }
    } else {
      data.media = [];
    }
  }

  test() {
    console.log("Hi");
  }

  static addDateMessage(messages_List) {
    if (messages_List.length < 1) return [];

    let copy_messages_list = messages_List.filter(
      (el) => el.type !== appConstants.message_type.DATE
    );
    messages_List = copy_messages_list;

    messages_List.sort((a, b) => {
      return b.created_at - a.created_at;
    });

    // //delete first date message ..after new message fetch it may be wrong
    // for(let index =0 ; index < messages_List.length-1 ; index++){
    //     if(messages_List[index].type == appConstants.message_type.DATE){
    //         messages_List.splice(index,1)
    //         break
    //     }
    // }

    for (let index = 0; index < messages_List.length - 1; index++) {
      let first_date = moment
        .utc(messages_List[index].created_at)
        .local()
        .format("L");

      if (messages_List[index + 1].type == appConstants.message_type.DATE) {
        index = index + 1;
      } else {
        let second_date = moment
          .utc(messages_List[index + 1].created_at)
          .local()
          .format("L");
        if (first_date != second_date) {
          Message.addMessage(messages_List, messages_List[index].uid);
          index = index + 1;
        }
      }
    }

    Message.addMessage(
      messages_List,
      messages_List[messages_List.length - 1].uid
    );

    return messages_List;
  }

  static addMessage(messages_List, before_message_id) {
    let index = messages_List.findIndex((x) => x.uid == before_message_id);
    if (index < 0) {
      return;
    }
    let mes_str = moment
      .utc(messages_List[index].created_at)
      .local()
      .calendar(null, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "dddd",
        sameElse: "DD/MM/YYYY",
      });

    var date_message = {
      uid: getUUID(),
      message_str: mes_str,
      type: appConstants.message_type.DATE,
    };
    let date_message_obj = new Message(date_message, []);

    if (index == messages_List.length - 1) {
      messages_List.push(date_message_obj);
    } else {
      messages_List.splice(index + 1, 0, date_message_obj);
    }
  }
}

export class Message_User extends User {
  user_id = "";

  constructor(data) {
    super(data);
    this.user_id = this.user_id = data.user_id == undefined ? "" : data.user_id;
    this.id = data.user_id == undefined ? "" : data.user_id;
  }
}
export class message_media {
  author = "";
  contentSize = 0;
  conversation_id = "";
  cover_image = "";
  created_at = "";
  height = 0;
  mediaType = 0;
  media_type = 0;
  message_id = "";
  name = "";
  original_file_name = "";
  uid = "";
  video_duration = 0;
  width = 0;

  constructor(data) {
    this.author = data.author == undefined ? "" : data.author;
    this.contentSize = data.contentSize == undefined ? "" : data.contentSize;
    this.conversation_id =
      data.conversation_id == undefined ? "" : data.conversation_id;
    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.height = data.height == undefined ? 0.0 : data.height;
    this.width = data.width == undefined ? 0.0 : data.width;
    this.name = data.name == undefined ? "" : data.name;
    this.mediaType = data.mediaType == undefined ? 0 : data.mediaType;
    this.media_type = data.media_type == undefined ? "" : data.media_type;
    this.message_id = data.message_id == undefined ? "" : data.message_id;
    this.original_file_name =
      data.original_file_name == undefined ? "" : data.original_file_name;
    this.uid = data.uid == undefined ? "" : data.uid;

    this.video_duration =
      data.video_duration == undefined ? 0.0 : data.video_duration;
  }
}
