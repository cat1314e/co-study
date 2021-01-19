import ajax from './http'

const apis = {
    user_login: (params) => ajax('post', '/user/login', params),
    user_permission: (params) => ajax('get', '/user/get_menu', params),
    user_info: (params) => ajax('get', '/data/user_info', params),
    user_situation: (params) => ajax('get', '/data/user_situation', params),
    user_situation_stay: (params) => ajax('get', '/data/situation_stay', params),
    user_situation_range: (params) => ajax('get', '/data/user_situation_range', params),

    user_get_new_add: (params) => ajax('get', '/data/user_get/new_add', params),
    user_get_invite_new_add: (params) => ajax('get', '/data/user_get/new_invite', params),
    user_get_new_add_stay: (params) => ajax('get', '/data/user_get/new_add_stay', params),
    user_get_range_data: (params) => ajax('get', '/data/user_get/range_data', params),

    user_feature_stage_range: (params) => ajax('post', '/data/user_feature/stage_range', params),
    user_feature_province_range: (params) => ajax('post', '/data/user_feature/province_range', params),
    user_feature_active_stage_range: (params) => ajax('post', '/data/user_feature/active/stage_range', params),
    user_feature_active_province_range: (params) => ajax('post', '/data/user_feature/active/province_range', params),
    user_feature_consume_stage_range: (params) => ajax('post', '/data/user_feature/consume/stage_range', params),
    user_feature_consume_province_range: (params) => ajax('post', '/data/user_feature/consume/province_range', params),


    report_get_options:(params) => ajax('get', '/v2/report/get/report_filter_options', params, 'study'),
    report_get_data: (params) => ajax('get', '/v2/report/get/report_record/need', params, 'study'),
    // report_get_data: (params) => ajax('get', '/v2/report/phone/get/report_record/need', params, 'study'),
    report_get_be_reporter_status: (params) => ajax('get', '/v2/report/get/be_reporter/status', params, 'study'),
    report_report_check: (params) => ajax('post', '/v2/report/report_check', params, 'study'),
    report_get_user_detention_record: (params) => ajax('get', '/v2/report/get/user_detention_record', params, 'study'),
    report_get_be_reporter_last_status: (params) => ajax('get', '/v2/report/get/be_reporter/last_status', params, 'study'),
    report_update_detention_record: (params) => ajax('post', '/v2/report/update/detention_record', params, 'study'),
    report_handle: (params) => ajax('post', '/v2/report/handel', params, 'study'),

    report_classroom_get_options:(params) => ajax('get', '/v2/report/get/classroom_report_filter_options', params, 'study'),
    report_classroom_get_be_reporter_status: (params) => ajax('get', '/v2/report/get/be_report_classroom/status', params, 'study'),
    report_classroom_get_data: (params) => ajax('get', '/v2/report/get/classroom_report_record/need', params, 'study'),
    report_classroom_get_user_detention_record: (params) => ajax('get', '/v2/report/get/classroom_detention_record', params, 'study'),
    report_classroom_get_be_reporter_last_status: (params) => ajax('get', '/v2/report/get/be_report_classroom/last_status', params, 'study'),
    report_classroom_update_detention_record: (params) => ajax('post', '/v2/report/update/classroom/detention_record', params, 'study'),

    faq_get_records_by_classify: (params) => ajax('get', '/v2/questions/'+params, {}, 'study'),
    faq_add_record: (params) => ajax('post', '/v2/faq/add_record', params, 'study'),
    faq_sort_records: (params) => ajax('post', '/v2/faq/sort/records', params, 'study'),
    faq_refresh_records: (params) => ajax('get', '/v2/faq/refresh/records', params, 'study'),
    faq_update_record: (params) => ajax('post', '/v2/faq/update/record', params, 'study'),
    faq_delete_record: (params) => ajax('post', '/v2/faq/delete/record', params, 'study'),


    get_oss: (params) => ajax('get', '/v1/oss_token', params, 'study'),
    calendar_get_text_records: (params) => ajax('get', '/v1/calendar/get/text_records', params),
    calendar_add_text_records: (params) => ajax('post', '/v1/calendar/add/text_record', params),
    calendar_update_text_records: (params) => ajax('post', '/v1/calendar/update/text_record', params),
    calendar_delete_text_record: (params) => ajax('post', '/v1/calendar/delete/text_record', params),

    calendar_get_img_classify: (params) => ajax('get', '/v1/calendar/get/img_classify', params),
    calendar_add_img_record: (params) => ajax('post', '/v1/calendar/add/img_record', params),
    calendar_get_img_records: (params) => ajax('get', '/v1/calendar/get/img_records', params),
    calendar_delete_img_record: (params) => ajax('post', '/v1/calendar/delete/img_record', params),

    message_record: (params) => ajax('get', '/im/get_msg_record', params),
    send_message_to_many: (params) => ajax('post', '/im/send_msg_to_many', params),

    active_add_school: (params) => ajax('post', '/active/add/new_school', params),
    get_school_list: (params) => ajax('get', '/active/get/school_list', params),
    update_school_info: (params) => ajax('post', '/active/update/school_info', params),


    co_user_property_shift: (params) => ajax('post', '/co_user/property/shift', params),
    co_user_property: (params) => ajax('get', '/co_user/property', params),


    image_shop_by_category: (params) => ajax('get', '/figure/image/shop/by_category', params, null),
    image_shop_upload: (params) => ajax('post', '/figure/image/shop/upload', params, null, {}, true),
    image_shop_sort_records: (params) => ajax('post', '/figure/image/shop/sort/records', params, null, {},true),
    image_shop_update_record: (params) => ajax('post', '/figure/image/shop/update/record', params, null, {}, true),
    // faq_delete_record: (params) => ajax('post', '/v2/faq/delete/record', params, 'study'),

};

export default apis