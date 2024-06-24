const appConstants = {
  current_URL: "https://olous.app/",
  BUSINESS_URL: "https://business.olous.app/",
  MESSAGING_MEDIA_MAX_SIZE : 104857600, //value in Bytes 104857600 == 100MB

  display_route_Name: {
    HOME: "home",
    LOGIN: "login",
    SIGNUP: "signup",
    ONBOARD: "onboard",
    FORGOTPASSWORD: "forgot_password",
    SEARCH: "search",
    POST: "post",
    TERMS: "terms",
    PRIVACYPOLICY: "privacy",
    TERMSOFSERVICE: "termsofservice",
    BUILDCV: "buildcv",
    BUILDCVNEW: "buildcvnew",
    PROFILENEW: "profileNew",
    SOFTWAREPROFICIENCIES: "softwareProficiencies",
    RESPONSIBILITY: "responsibility",
    LANGUAGE: "language",
    VIEWPROFILE: "profile",
    EXPERIENCE: "experience",
    EDUCATION: "education",
    CERTIFICATION: "certification",
    ACHIEVEMENTS: "achievements",
    KEYSKILLS: "keyskills",
    SOFTSKILLS: "softskills",
    INTEREST: "interest",
    OTHERDETAILS: "otherdetails",
    EDITPROFILE: "edit_profile",
    TIMELINE: "timeline",
    BOARDLIST: "boards",
    BOARDDETAILS: "boarddetail",
    COMPANYWEBSITE: "companywebsite",
    CREATEPOST: "createpost",
    ACTIVITY: "activities",
    ABOUT: "about",
    FAQ: "faqs",
    CONTENT: "content",
    HEADLINES: "articles",
    BUSINESS: "business",
    PROFILE: "profile",
    DOCUMENTS: "library",
    JOBS: "jobs",
    JOBDETAILS: "jobdetails",
    BUSINESSLIST: "business",
    MESSAGING: "messaging",
    CONVERSATION: "conversation",
    NEW: "new",
    JSBRIDGE: "jsbridge",
    UNSUBSCRIBE: "unsubscribe",
    SINGLEDAYTOPNEWS: "topheadlines",
    TOPNEWSLIST: "list",
    HEADLINE: "headlines",
    SETTINGS: "settings",
    CHANGEPASSWORD: "changepassword",
    PUSHNOTIFICATION: "pushnotification",
    EMAILNOTIFICATION: "emailnotification",
    PERSONALINFO: "personalinfo",
    MOBILE: "mobile",
    MOBILEMESSAGING: "messaging",
    MOBILECONVERSATION: "conversation",
    MOBILENEW_CONVERSATION: "newConversation",
    MOBILENEW: "new",
    PRICING: "payment",
    SUCCESS: "success",
    LEAD: "enquiry",
    STATUS: "status",
    EXTERNALUSERPROFILE: "externaluserprofile",
    PREVIEWCV: "previewcv",
    BUSINESS_EXPLORE: "explorebusiness",
    JOB_EXPLORE: "explorejobs",
    TIMELINESEEALL: "all",
    VIDEOS: "videos",
  },

  routes: {
    HOME: "home",
    LOGIN: "login",
    LOGINWITHPARAM: "loginwithparam",
    SIGNUP: "signup",
    ONBOARD: "onboard",
    FORGOTPASSWORD: "forgot_password",
    SEARCH: "search",
    POST: "post",
    TERMS: "terms",
    PRIVACYPOLICY: "privacy",
    TERMSOFSERVICE: "termsofservice",
    BUILDCV: "buildcv",
    BUILDCVNEW: "buildcvnew",
    PROFILENEW: "profileNew",
    LANGUAGE: "language",
    SOFTWAREPROFICIENCIES: "softwareProficiencies",
    RESPONSIBILITY: "responsibility",
    VIEWPROFILE: "profile",
    EXPERIENCE: "experience",
    EDUCATION: "education",
    CERTIFICATION: "certification",
    ACHIEVEMENTS: "achievements",
    KEYSKILLS: "keyskills",
    SOFTSKILLS: "softskills",
    INTEREST: "interest",
    OTHERDETAILS: "otherdetails",
    EDITPROFILE: "edit_profile",
    TIMELINE: "timeline",
    BOARDLIST: "boards",
    BOARDDETAILS: "boarddetail",
    COMPANYWEBSITE: "companywebsite",
    ACTIVITY: "activities",
    JOBS: "jobs",
    JOBDETAILS: "jobdetails",
    JOBSTATUS: "jobstatus",
    BUSINESSLIST: "businesslist",
    ARTICLE: "articles",

    SEARCH_CONTENT: "searchContent",
    DEFAULT_SEARCH_CONTENT: "defaultsearchContent",

    SEARCH_HEADLINES: "searchByArticles",
    DEFAULT_SEARCH_HEADLINES: "defaultsearchByArticles",

    SEARCH_DOCUMENTS: "searchByLibrary",
    DEFAULT_SEARCH_DOCUMENTS: "defaultsearchByLibrary",

    SEARCH_BUSINESS: "searchByBusiness",
    DEFAULT_SEARCH_BUSINESS: "defaultsearchByBusiness",

    SEARCH_PROFILE: "searchByProfile",
    DEFAULT_SEARCH_PROFILE: "defaultsearchByProfile",

    CREATEPOST: "createpost",

    PRODUCTDETAILS: "product",
    PORTFOLIO_URL: "business",

    CHOOSEORG: "chooseorg",
    ABOUT: "about",
    FAQ: "faqs",
    MESSAGING: "messaging",
    CONVERSATION: "conversation",
    NEW_CONVERSATION: "newConversation",
    JSBRIDGE: "jsbridge",
    IOSBRIDGE: "iosbridge",
    SINGLEDAYTOPNEWS: "topheadlines",
    TOPNEWSLIST: "list",
    UNSUBSCRIBE: "unsubscribe",
    HEADLINE: "headlines",
    MOBILE: "mobile",
    MOBILEMESSAGING: "mobileMessaging",
    MOBILECONVERSATION: "mobileConversation",
    MOBILENEW_CONVERSATION: "mobileNewConversation",
    JOBEXTERNAL: "external",
    FOLLOWERSANDFOLLOWING: "list",
    EVENTREGISTRATION: "event",
    REGISTER: "register",
    RESUME: "resume",
    PRICING: "payment",
    PRICING_SUCCESS: "paymentSuccess",
    LEAD: "enquiry",
    PREVIEWCV: "previewcv",
    BUSINESS_EXPLORE: "explorebusiness",
    JOB_EXPLORE: "explorejobs",
    TIMELINESEEALL: "all",
    VIDEOS: "video",
  },

  url_separator: "_activity_",
  url_separator_jobs: "_job_",
  url_separator_boards: "_board_",

  media_Type: {
    IMAGE: 0,
    VIDEO: 1,
    FILE: 2,
    COVER_IMAGE: 3,
    VIDEOPORTFOLIO: 4,
    TEXT: 5,
    URL: 6,
    MIX_TYPE: 7,
  },

  media_stored_at: {
    MEDIA_IMAGES: 0, //media/images
    MEDIA_VIDEO: 1, //media/video
    MEDIA_DOCUMENTS: 2, //media/docuemnts
    MEDIA_COVERIMAGES: 3, //media/images
    MEDIA_VIDEOPORTFOLIO: 4, //media/video
    // TEXT: 5,
    // URL: 6,
    MEDIA_PRODUCT: 7, //media/product
    MEDIA_CATALOGUE: 8, //media/catalogue
  },

  search_response_types: {
    POST: "timeline_post",
    HEADLINES: "headlines",
    DOCUMENT: "document",
  },

  search_tabs: {
    CONTENT: "content",
    COMPANIES: "companies",
    VENDOR: "vendors",
    USERS: "users",
  },
  search_sub_tabs: {
    ALL: "all",
    HEADLINE: "headline",
    DOCUMENT: "document",
  },
  report_states: {
    NOT_RELATE: 0,
    SPAM: 1,
    OFFENSIVE: 2,
    // not_relate = 0, spam = 1, offensive = 2
  },

  //used for slug
  //PORTFOLIO_URL: "https://company.olous.app/portfolio/",
  PORTFOLIO_URL: "business/",

  //Cookies name
  USER_TOKEN: import.meta.env.VITE_APP_USER_TOKEN_NAME,

  //user company URL
  USERCOMPANYURL: "company.olous.app",

  shape_page_postfix: {
    //IF any changes in below enum, please do changes in  server constant.js file
    POST: "p",
    DOCUMENT: "d",
    HEADLINE: "h",
  },

  //Max limit of logo image
  imageLogoSize: {
    MAX_SIZE: 512000, //500kb in binary bytes //in bytes vadsoft 3.48kb 353 x 143
    MAX_WIDTH: 1080,
    MAX_HEIGHT: 1080,
  },

  //Max limit for image
  imageSize: {
    MAX_SIZE: 512000, //500 KB = 512000 Bytes(in binary)
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1080,
  },
  ACCEPT_IMAGE_TYPE: ".png,.jpeg,.jpg",
  ACCEPT_VIDEO_TYPE: ".mp4",
  ACCEPT_FILE_TYPE: ".pdf",
  IMAGE_CONTENT_TYPE: "image",
  VIDEO_CONTENT_TYPE: "video",
  PDF_CONTENT_TYPE: "application/pdf",
  PATH_SAVE_MEDIA_IMAGE_ON_S3: "media/images/",
  PATH_SAVE_MEDIA_VIDEOS_ON_S3: "media/video/",
  PATH_SAVE_JOB_ATTACHMENT_ON_S3: "olous_cv/attachments/",
  PATH_SAVE_MESSAGING_MEDIA: "media/messaging/",

  profile_completion: {
    NONE: 0,
    ACCREDITIONS: 1,
    ACHIEVEMENT: 2,
    INTERESTS: 3,
    KEYSKILL: 4,
    profession_cat: 5,
    SECTORS: 6,
    SOFTSKILL: 7,
    SOFTWARE_PROFICIENCIES: 8,
    EXPERIENCES: 9,
    RESPONSIBILITIES: 10,
    EDUCATIONS: 11,
    EMAIL: 12,
    PHONENUMBER: 13,
    DOB: 14,
    LANGUAGE: 15,
  },

  // device
  devices: {
    IOS: "ios",
    ANDROID: "android",
  },

  // showHeaders
  hideHeader: {
    ALL: "1",
    LAPTOP: "2",
    MOBILE: "3",
    NULL: "4",
  },

  // toast severity
  toast_severity: {
    SUCCESS: "success",
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
  },
  // toast summary
  toast_summary: {
    SUCCESS: "Success",
    ERROR: "Error",
    INFO: "Information",
  },

  FeedType: {
    NORMAL: 0,
    SHARED: 1,
    LIKED: 2,
    COMMENTED: 3,
    ADVERTISED: 4,
    EDITOR: 5,
  },
  UserType: {
    USER: "user",
    COMPANY: "company",
  },

  MetaLength: {
    TITLE: 85,
    DESCRIPTION: 155,
  },

  metaData: {
    TITLE: "Discover Construction Network, News, Videos & Jobs | Olous",
    DESCRIPTION:
      "Search for anything in Global Construction, Connect with Top Industry Professionals, find latest news & projects, gain knowledge and apply to trending jobs",
    IMAGE:
      "https://olous.s3.ap-south-1.amazonaws.com/website/static/images/favicon/apple-touch-icon.png",
    SITE_NAME: "Olous",
    TYPE: "website",
    META_IMAGE_ALT: "Olous",
    URL: "https://olous.app/",
    KEYWORDS:
      "Construction Videos,Construction articles,Digital construction,Construction Knowledge,Global Construction Professionals,Networking in Construction Companies,Job titles in construction company,Career in construction,Professional job roles in construction,Construction and Infrastructure news",
  },

  api_response: {
    UNAUTHORIZED: 401,
    NOT_FOUNT: 404,
    NOT_ACCEPTABLE: 406,
    DELETED_PERMANENTLY: 410,
    FORBIDDEN: 403,
  },
  jobType: {
    ALL: "jobTypeAll",
    APPLIED: "jobTypeApplied",
    BOOKMARKED: "jobTypeBookmark",
    ADVANCED: "Advanced",
  },

  callback_url: {
    BUSINESS: "business",
  },

  css_breakpoints: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },

  messaging_user_status: {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
  },

  message_type: {
    TEXT: 0,
    IMAGE: 1,
    VIDEO: 2,
    FILE: 3,
    IMAGE_TEXT: 4,
    VIDEO_TEXT: 5,
    FILE_TEXT: 6,
    MEMBER_ADD: 7,
    MEMBER_REMOVED: 8,
    MEMBER_LEFT: 9,
    DATE: 10,
    REPLY: 11,
    INITIATED_CHAT: 12,
    DELETE: 13,
    BLOCK: 14,
    UNBLOCK: 15,
  },

  conversation_status: {
    PENDING: 1,
    ACCEPTED: 2,
    BLOCKED: 3,
  },

  application_messaging_location: {
    CONVERSESATION_LIST: 1,
    MESSAGING: 2,
    NEW_CONVERSESATION: 3,
  },
  reason_type: {
    I_NO_LONGER_WISH_TO_RECEIVE: 1,
    EMAILS_ARE_NOT_RELEVENT: 2,
    I_DONT_REMEMBER_SIGNUP: 3,
    EMAILS_ARE_TOO_FREQUENT: 4,
    NOT_LOOKING_FOR_JOB: 5,
    EMAILS_ARE_CLUTTERING_INBOX: 6,
    TOPICS_ARE_NOT_RELEVENT: 7,
    OTHERS: 8,
  },
  email_category: {
    MARKETING: "1",
    EDUCATION: "2",
    PERSONAL_ATTACHMENT: "3",
    ACTIVITY: "4",
    JOB: "5",
    ENGAGEMENT: "6",
  },
  WORK_LOCATION: {
    ONSITE: 2,
    OFFICE: 1,
    REMOTE: 3,
  },
  delete_account_reasons: {
    OTHER: 0,
    NOT_FROM_CONSTRUCTION: 1,
    NOT_SATISFIED: 2,
    FACING_BUGS: 3,
    NONE: 4,
  },
  Unsubscribe_Redirect: {
    ERROR: 0,
    UNSUBSCRIBED_SUCCESSFULLY: 1,
    NOT_ALLOWED: 2,
    LOGIN_TO_UNSUBSCRIBE: 3,
    UNSUBSCRIBE_WITH_OPTIONS: 4,
  },
  users_type: {
    FOLLOWERS: "Followers",
    FOLLOWING: "Following",
  },
  Application_Status: {
    OPEN: 1,
    ACCEPTED: 2,
    REJECTED: 3,
  },

  Currency: {
    INR: "INR",
    USD: "USD",
  },

  PricingModuleType: {
    EVENT: 1,
    COMPANY_REGISTRATION: 2,
    LEAD: 3,
    JOB: 4,
  },

  OTPEnums: {
    FORGOT_PWD_OTP: 0,
    EMAIL_VERIFICATION_OTP: 1,
    PHONE_VERIFICATION_OTP: 2,
    LOGIN_OTP: 3,
    PRICING_PHONE_VERIFICATION_OTP: 4,
  },

  compType: [
    { id: 1, name: "Service" },
    { id: 2, name: "Product" },
    { id: 3, name: "Mixed" },
  ],

  currency: [
    { id: 1, name: "INR" },
    { id: 2, name: "USD" },
    { id: 3, name: "Pound" },
    { id: 4, name: "Euro" },
  ],

  min_work_options: [
    { id: 1, name: "Upto One Lakh" },
    { id: 2, name: "1 To 5 Lakhs" },
    { id: 3, name: "5 To 10 Lakhs" },
    { id: 4, name: "10 To 20 Lakhs" },
    { id: 5, name: "20 To 50 Lakhs" },
    { id: 6, name: "50 To 1 Cr" },
    { id: 7, name: "1 To 5 Cr" },
    { id: 8, name: "5 Cr+" },
  ],

  lead_project_type: [
    { id: 1, value: "Residential" },
    { id: 2, value: "Commercial" },
    { id: 3, value: "Industrial" },
  ],

  lead_appx_area: [
    { id: 1, value: "1-2 Lakh (Sqft)" },
    { id: 2, value: "2-5 Lakh (Sqft)" },
    { id: 3, value: "5-10 Lakh (Sqft)" },
    { id: 4, value: "> 10 lakh (Sqft)" },
  ],

  company_turnover_options: [
    { id: 1, name: "Under 1 Cr." },
    { id: 2, name: "1 to 5 Cr." },
    { id: 3, name: "5 to 10 Cr." },
    { id: 4, name: "10 to 20 Cr." },
    { id: 5, name: "20 to 30 Cr." },
    { id: 6, name: "30+ Cr." },
  ],

  contractor_should_have_done: [
    { id: 1, value: "High Rise" },
    { id: 2, value: "Commercial" },
    { id: 3, value: "Industrial" },
  ],

  lead_applied_as: {
    USER: 1,
    COMPANY: 2,
  },

  lead_type_of_contract: {
    TURNKEY: 1,
    WITH_MATERIAL: 2,
    ONLY_LABOUR: 3,
  },

  lead_type_of_contract_0ptions: [
    { id: 1, value: "Turnkey" },
    { id: 2, value: "With Material" },
    { id: 3, value: "Only Labour" },
  ],
  category: {
    CONTRACTOR: 2,
  },

  job_applciation_status: {
    OPEN: 1,
    ACCEPTED: 2,
    REJECTED: 3,
    UNDER_REVIEW: 4,
    INTERVIEW_REQUESTED: 5,
    INTERVIEW_SCHEDULED: 6,
  },

  job_notice_period: {
    ANY: 0,
    IMMEDIATE: 1,
    DAYS_15: 2,
    DAYS_30: 3,
    DAYS_45: 4,
    DAYS_60: 5,
    DAYS_75: 6,
    DAYS_90: 7,
  },

  job_notice_period_list: [
    { id: 1, name: "Immediate" },
    { id: 2, name: "15 Days" },
    { id: 3, name: "30 Days" },
    { id: 4, name: "45 Days" },
    { id: 5, name: "60 Days" },
    { id: 6, name: "75 Days" },
    { id: 7, name: "90 Days" },
  ],

  Language_Fluency: {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    FLUENT: 3,
  },

  Language_Fluency_list: [
    { id: 1, name: "Beginner" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Fluent" },
  ],

  Language_Fluency: {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    FLUENT: 3,
  },

  Language_Fluency_list: [
    { id: 1, name: "Beginner" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Fluent" },
  ],

  CV_ELEMENTS: {
    EXPERIENCE: 1,
    CERTIFICATES: 2,
    EDUCATION: 3,
    SOFTWARE_PROFICIENCY: 4,
    TECHNICAL_SKILL: 5,
    SOFT_SKILL: 6,
    ACHIEVEMENTS: 7,
    INTERESTS: 8,
    LANGUAGES: 9,
    OTHER_DETAILS: 10,
    RESPONSIBILITY: 11,
    EDIT_PROFILE: 12,
  },
  Landing_Page_Enum: {
    EXPERIENCE: 1,
    EDUCATION: 2,
    HOME: 0,
  },
  Timeline_Type: {
    BUSINESS_LEAD: 1,
    USER: 2,
    JOB: 3,
    BUSINESS: 4,
    COURSE: 5,
    CHANNEL: 6,
    COMPANY_ADVERT: 7,
    JOB_ADVERT: 8,
    LEAD_ADVERT: 9,
  },
  pricing_plan_job: {
    FREE: "j_free",
    PREMIUM: "j_premium",
    BASIC: "j_basic",
  },
  pricing_plan_duration: {
    YEARLY: 0,
    HALF_YEARLY: 1,
    QUATERLY: 2,
    MONTHLY: 3,
  },
  contact_type: {
    USER: 0,
    COMPANY: 1,
  },
  upload_file_type: {
    IMAGE: 1,
    VIDEO: 2,
    PDF: 3,
    ZIP: 4,
  },
};

export default Object.freeze(appConstants);
