export class order {
    id = "";
    amount = 0;
    coupon_id = "";
    amount_after_discount = "";
    currency = "";
    user_id = "";
    name ="";
    email = "";
    contact = "";
    notes = null;
    module_type = "";
    module_id = "";
    order_expired_on =null;
    paid_at = null;
    receipt_id = "";
    status = null;
    amount_to_display_user = ""
    amount_after_discount_to_display_user = ""
    razorpay_order_id = ""
    razorpay_payment_id = "";
    
  
    constructor(data) {
      this.id = data.id == undefined ? "" : data.id;
      this.razorpay_order_id = data.razorpay_order_id == undefined ? "" : data.razorpay_order_id;
      this.amount = data.amount == undefined ? 0 : data.amount;
      this.coupon_id = data.coupon_id == undefined ? "" : data.coupon_id;
      this.amount_after_discount = data.amount_after_discount == undefined ? 0 : data.amount_after_discount;
      this.currency = data.currency == undefined ? "" : data.currency;
      this.user_id = data.user_id == undefined ? "" : data.user_id;
      this.name = data.name == undefined ? "" : data.name;
      this.email = data.email == undefined ? "" : data.email;
      this.contact = data.contact == undefined ? "" : data.contact;
      if (this.contact == "")
      {
        this.country_code = data.country_code == undefined ? "+91" : data.country_code;
      }else{
        this.country_code = data.country_code == undefined ? "" : data.country_code;
      }
      
      this.notes = data.notes == undefined ? null : data.notes;
      this.module_type = data.module_type == undefined ? "" : data.module_type;
      this.module_id = data.module_id == undefined ? "" : data.module_id;
      this.order_expired_on = data.order_expired_on == undefined ? null : data.order_expired_on;
      this.rayzorpay_payment_id = data.rayzorpay_payment_id == undefined ? "" : data.rayzorpay_payment_id;
      this.paid_at = data.paid_at == undefined ? null : data.paid_at;
      this.receipt_id = data.receipt_id == undefined ? "" : data.receipt_id;
      this.status = data.status == undefined ? null : data.status;
      this.amount_to_display_user = data.amount_to_display_user == undefined ? "" : data.amount_to_display_user;
      this.amount_after_discount_to_display_user = data.amount_after_discount_to_display_user == undefined ? "" : data.amount_after_discount_to_display_user;
      this.razorpay_payment_id = data.razorpay_payment_id == undefined ? "" : data.razorpay_payment_id;
    }


}




