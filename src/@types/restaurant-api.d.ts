declare module "@api.Restaurant" {
  type AResponse<T = any> = {
    message_id: string;
    result: boolean;
    message: string;
    object: T;
  };

  // RICEPO逻辑(minimum maximum 相关判断逻辑):
  // minimum == 0 && maximum > 0 最多选max个
  // minimum > 0 && maximum == 0 最少选min个
  // minimum > 0 && maximum == minimum 一定要选择min个，不能少也不能多（必选）
  // minimum > 0 && maximum > minimum 选择 minimum ～ maximum 个 不能少于min也不能多于max
  type GetDishOptionResObj = {
    product_id: number;
    id: number;
    ref_id: string;
    merchant_product_extra_id: number;
    name_zh: string;
    name: string;
    name_en: string;
    name_zht: string;
    minimum: number;
    maximum: number;
    option_required: boolean;
    option_single: boolean;
    rec_create_time: Date;
    rec_update_time: Date;
    items: {
      id: number;
      ref_id: string;
      merchant_product_extra_options_id: number;
      name_zh: string;
      name_en: string;
      name_zht: string;
      name: string;
      price: number;
      popularity: number | null;
      /** 是否可选 */
      available: boolean;
      rec_create_time?: any;
      rec_update_time?: any;
    }[];
  }[];

  type GetRestaurantsReqParams = {
    page: number;
    size: number;
    param: {
      zip_code: string;
      date: string;
      wave_seq?: string;
      tag_id?: string;
    };
  };

  type GetRestaurantsResObj = {
    restaurantResponses: {
      title: string;
      vender_id: number;
      address: string;
      description?: any;
      businessStatus: string;
      logo_url: string;
      image_url: string;
      open_day?: any;
      tag: string[];
      business_hours?: any;
      free_delivery_price: number;
      restaurant_pos: number;
      priority: number;
      rec_create_time?: any;
      tagline?: any;
      tag_id: number[];
      unavailable?: any;
      top: boolean;
      top_ranking: number;
      default_wave_seq?: any;
      product_infos_five?: any;
      pickup_available: string;
      ricepo_tags?: any;
      out_url?: any;
      ondemand: boolean;
      ondemand_only: boolean;
      business: {
        vender_id?: any;
        merchant_id: number;
        open_date_time: string;
        closed: boolean;
        closeType: number;
        closed_tip: string;
      };
      estimate: {
        merchantId: number;
        min: number;
        max: number;
        avg: number;
        start: string;
        end: string;
        deadline: Date;
      };
      ref_id?: any;
      shipping_free_fee: number;
      shipping_free_fee_vip: number;
      reward_tip: string;
    }[];
    merchantTagResponse: {
      id: number;
      tag_name?: any;
      tag_name_zht?: any;
      tag_name_en?: any;
      filter_status: boolean;
      filter_level?: any;
      type?: any;
      ref_key?: any;
      rec_create_time?: any;
      rec_update_time?: any;
      name: string;
    }[];
    carouselGroupResponse?: any;
    tag_id?: any;
    window?: any;
  };
}
