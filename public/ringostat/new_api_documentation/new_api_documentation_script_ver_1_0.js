(function(){
    //connect styles for article
    let styleTag = document.createElement('style');
    styleTag.innerHTML = `.main-width{max-width:95%}.mainArea.object-max-width{max-width:100%}.article-content{display:flex;flex-direction:flex-column}.article-content ul.api_code_tab_caption,.article-content ul.nav{padding-left:0}.sticky{position:fixed!important;top:10px!important}.api_nav{position:relative;padding-right:5px}ul.nav{display:block}li.nav-block-title{font-size:16px!important;font-weight:600}li.nav-block-title:hover{background-color:#fff!important}li.nav-item{width:200px}li>.nav-link{color:#4caf50}ul.api_code_tab_caption>li.api_code_tab_caption_item:hover,ul:not(#new_list)>li:not(.active):hover{background-color:inherit;border-top-right-radius:none;border-bottom-right-radius:none}.active{background-color:#4caf508c;border-top-right-radius:20px;border-bottom-right-radius:20px}.active>.nav-link{color:#fff}.api_content{padding:0 50px;border-left:2px solid #00000038}.margin_block{margin-left:230px!important}section.row{margin:15px 0}.api_endpoint[data-method]{display:inline-block;padding:10px;border:1px solid grey;border-radius:10px;margin-bottom:15px}.api_endpoint[data-method=get]{border-color:#469408}.api_endpoint[data-method=get]>.api_endpoint_method{font-size:14px;font-weight:700;min-width:80px;padding:6px 15px;text-align:center;border-radius:3px;background:#469408;text-shadow:0 1px 0 rgba(0,0,0,.1);color:#fff}.api_endpoint[data-method=get]>.api_endpoint_link{font-size:16px;padding:0 10px;font-family:Source Code Pro,monospace;font-weight:600;color:#3b4151;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.api_endpoint[data-method=post]{border-color:#5bc0de}.api_endpoint[data-method=post]>.api_endpoint_method{font-size:14px;font-weight:700;min-width:80px;padding:6px 15px;text-align:center;border-radius:3px;background:#5bc0de;text-shadow:0 1px 0 rgba(0,0,0,.1);color:#fff}.api_endpoint[data-method=post]>.api_endpoint_link{font-size:16px;padding:0 10px;font-family:Source Code Pro,monospace;font-weight:600;color:#3b4151;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.panel{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-box-shadow:0 2px 6px rgba(0,0,0,.08);-webkit-box-shadow:0 2px 6px rgba(0,0,0,.08);box-shadow:0 2px 6px rgba(0,0,0,.08);background-color:#fff;margin-bottom:30px}.panel .panel-heading{position:relative}.article-content table{width:-webkit-fill-available}.article-content table thead tr th{text-align:center}.full-article pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px;background:#f8f8f8;background-size:2em 4em;position:relative;padding-left:5px;line-height:1.5em;margin-bottom:15px;white-space:pre-wrap;font-size:12px}.full-article pre:before{content:none;position:absolute;left:0;border:none;top:0;bottom:0}ul.api_code_tab_caption{display:flex;list-style:none;flex-direction:row;justify-content:flex-start;margin-bottom:0}ul.api_code_tab_caption>li.api_code_tab_caption_item{padding:5px;font-weight:600;margin-top:0}ul.api_code_tab_caption>li.api_code_tab_caption_item.active{border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:0;border-bottom-right-radius:0;border:1px solid #ccc;background-color:#f5f5f5;border-bottom:0}.api_code_tab_content{display:none}section.api_code_tab>section.api_code_tab_content.active{display:block}.api_code_tab_caption_item{cursor:pointer}`;
    document.head.appendChild(styleTag);

    /* navigate logic */
    //scroll page to content
    function scrollPageIntoView(anchorLink) {
        let contentElement = document.getElementById(anchorLink);
        contentElement.scrollIntoView({behavior: 'smooth'});
    };

    //on nav-link click
    let navigateLinks = document.querySelectorAll('a[href^="#"]');

    navigateLinks.forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            //if url contains hash - next a clicks will be in hash
            if (location.hash) {
                location.href = this.href;
            }

            return scrollPageIntoView(this.getAttribute('href'))
        });
    });

    //on location hash
    let getCurrentHash = location.hash;
    if (getCurrentHash) {
        let getNavLink = document.querySelector(`a[href='${getCurrentHash}']`);

        //add class active to link parent
        getNavLink.parentElement.classList.toggle('active');
        scrollPageIntoView(getCurrentHash);
    }

    //exclud class from li title click
    function disableAddClassActive(item){
        item.addEventListener('click', function(){
            this.classList.toggle('active');
        });
    };
    let navItemTitle = document.querySelectorAll('.nav-block-title');
    let newListItems = document.querySelectorAll('ul#new_list li');

    newListItems.forEach(function(listItem){
        return disableAddClassActive(listItem);
    });

    navItemTitle.forEach(function(listTitle){
        return disableAddClassActive(listTitle);
    });

    //set nav-menu sticky on page scroll
    let apiNavigateBlock = document.querySelector('.api_nav');
    let apiContentBlock = document.querySelector('.api_content');

    //add class active to navigate links on page scroll
    window.onscroll = function() {
        let position = window.pageYOffset;
        if (position > 273) {
            apiNavigateBlock.classList.add('sticky');
            apiContentBlock.classList.add('margin_block');
        } else {
            apiNavigateBlock.classList.remove('sticky');
            apiContentBlock.classList.remove('margin_block');
        };

        if (position > 0 && position <= 900) {
            removeActiveOnscroll();
            document.querySelector('[href="#api_overview"]').parentElement.classList.add('active');
        }
        if (position >= 1190 && position <= 1300) {
            removeActiveOnscroll();
            document.querySelector('[href="#export_calllog"]').parentElement.classList.add('active');
        }
        if (position >= 1301 && position <= 1900) {
            removeActiveOnscroll();
            document.querySelector('[href="#export_calllog_overview"]').parentElement.classList.add('active');
        }
        if (position >= 1901 && position <= 3300) {
            removeActiveOnscroll();
            document.querySelector('[href="#export_calllog_parameters"]').parentElement.classList.add('active');
        }
        if (position >= 3500 && position <= 3900) {
            removeActiveOnscroll();
            document.querySelector('[href="#export_calllog_filters"]').parentElement.classList.add('active');
        }
        if (position >= 4000 && position <= 4500) {
            removeActiveOnscroll();
            document.querySelector('[href="#export_calllog_mergeAndSort"]').parentElement.classList.add('active');
        }
        if (position >= 4700 && position <= 5100) {
            removeActiveOnscroll();
            document.querySelector('[href="#callback_simple"]').parentElement.classList.add('active');
        }
        if (position >= 5300 && position <= 6700) {
            removeActiveOnscroll();
            document.querySelector('[href="#callback_extended"]').parentElement.classList.add('active');
        }
        if (position >= 7000 && position <= 7500) {
            removeActiveOnscroll();
            document.querySelector('[href="#sip_online"]').parentElement.classList.add('active');
        }
        if (position >= 7510) {
            removeActiveOnscroll();
            document.querySelector('[href="#sip_busy"]').parentElement.classList.add('active');
        }
    }

    function removeActiveOnscroll() {
        let activeNavItem = document.querySelector('li.nav-item.active');

        if (activeNavItem) {
            return activeNavItem.classList.remove('active');
        }
    };

    let tabLink = document.querySelectorAll('.api_code_tab_caption_item');

    tabLink.forEach(function(caption){
        caption.addEventListener('click', function(event){
            let request = 'request',
                response = 'response';
            //get content block id
            let getThisAttribute = event.currentTarget.getAttribute('data-target');

            if (getThisAttribute.split('_')[2] === request) {
                document.querySelector(`#${getThisAttribute.split('_')[0]}_${getThisAttribute.split('_')[1]}_${request}`).setAttribute('style', 'display:block');
                document.querySelector(`#${getThisAttribute.split('_')[0]}_${getThisAttribute.split('_')[1]}_${response}`).setAttribute('style', 'display:none');
            }
            if (getThisAttribute.split('_')[2] === response) {
                document.querySelector(`#${getThisAttribute.split('_')[0]}_${getThisAttribute.split('_')[1]}_${response}`).setAttribute('style', 'display:block');
                document.querySelector(`#${getThisAttribute.split('_')[0]}_${getThisAttribute.split('_')[1]}_${request}`).setAttribute('style', 'display:none');
            }
        });
    });

    //описание стандартных параметров запроса выгрузки ЖЗ
    let default_parameters_request = document.querySelector('pre.default_parameters_request');
    let default_parameters_response = document.querySelector('pre.default_parameters_response');
    default_parameters_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/calls/export",\n\ttype: "get",\n\tdata: {\n\t\tproject_id: '11111',\n\t\ttoken: 'unique_user_token',\n\t\texport_type: 'json',\n\t\tfrom: '2019-06-01 00:00:00',\n\t\tto: '2019-06-18 23:59:59',\n\t\tfields: 'calldate,caller,dst,disposition,billsec,utm_source,utm_medium,recording',\n\t\tfilters: \`disposition~\${btoa('answered|proper|repeated')}\`\n\t},\n\tsuccess: function(response) {\n\t\t// <i>handle response</i>\n\t},\n\terror: function(xhr) {\n\t\t// <i>handle error</i>\n\t}\n});`;
    default_parameters_response.innerHTML = `[\n\t{\n\t\t"calldate":"2019-06-02T09:30:47+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"disposition":"ANSWERED",\n\t\t"billsec":11,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token"\n\t},\n\t{\n\t\t"calldate":"2019-06-04T13:07:53+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"disposition":"ANSWERED",\n\t\t"billsec":12,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token"\n\t}\n]`;

    //описание всех параметров запроса выгрузки ЖЗ
    let call_parameters_request = document.querySelector('pre.call_parameters_request');
    let call_parameters_response = document.querySelector('pre.call_parameters_response');
    call_parameters_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/calls/export",\n\ttype: "get",\n\tdata: {\n\tproject_id: '11111',\n\t\ttoken: 'unique_user_token',\n\t\texport_type: 'json',\n\t\tfrom: '2019-06-01 00:00:00',\n\t\tto: '2019-06-18 23:59:59',\n\t\tfields: 'calldate,caller,dst,pool_name,disposition,category_mark,duration,call_type,waittime,billsec,connected_with,call_counter,proper_flag,repeated_flag,utm_source,utm_medium,utm_campaign,utm_content,utm_term,uniqueid,category_number,employee_number,employee_mark,client_id,remote_ip,refferrer,landing,recording,call_card,additional_number,has_recording,scheme_name,duration_ms'\n\t},\n\t\tsuccess: function(response) {\n\t\t// <i>handle response</i>\n\t},\n\terror: function(xhr) {\n\t\t// <i>handle error</i>\n\t}\n});`;
    call_parameters_response.innerHTML = `[\n\t{\n\t\t"calldate":"2019-06-02T09:13:43+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"pool_name":"Simple nums pool",\n\t\t"disposition":"NO ANSWER",\n\t\t"category_mark":0,\n\t\t"duration":36,\n\t\t"call_type":"in",\n\t\t"waittime":"36",\n\t\t"billsec":0,\n\t\t"connected_with":"",\n\t\t"call_counter":1,\n\t\t"proper_flag":0,\n\t\t"repeated_flag":0,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"utm_campaign":"(direct)",\n\t\t"utm_content":"(not set)",\n\t\t"utm_term":"none)",\n\t\t"uniqueid":"unique_call_id",\n\t\t"category_number":-1,\n\t\t"employee_number":-1,\n\t\t"employee_mark":0,\n\t\t"client_id":"1169999034.15555555108",\n\t\t"remote_ip":"10.10.10.10",\n\t\t"refferrer":"http://localhost:3000/",\n\t\t"landing":"localhost/",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token",\n\t\t"call_card":"https://app.ringostat.com/project/callcards/card/unique_call_id/?project_id=11111",\n\t\t"has_recording":"0",\n\t\t"scheme_name":"test schema",\n\t\t"duration_ms":"36000"\n\t},\n\t{\n\t\t"calldate":"2019-06-02T09:30:47+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"pool_name":"Simple nums pool",\n\t\t"disposition":"ANSWERED",\n\t\t"category_mark":0,\n\t\t"duration":23,\n\t\t"call_type":"in",\n\t\t"waittime":"12",\n\t\t"billsec":11,\n\t\t"connected_with":"380671112233",\n\t\t"call_counter":2,\n\t\t"proper_flag":0,\n\t\t"repeated_flag":0,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"utm_campaign":"(direct)",\n\t\t"utm_content":"(not set)",\n\t\t"utm_term":"(none)",\n\t\t"uniqueid":"unique_call_id",\n\t\t"category_number":-1,\n\t\t"employee_number":-1,\n\t\t"employee_mark":0,\n\t\t"client_id":"1169999034.15555555108",\n\t\t"remote_ip":"10.10.10.10",\n\t\t"refferrer":"http://localhost:3000/",\n\t\t"landing":"localhost/",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token",\n\t\t"call_card":"https://app.ringostat.com/project/callcards/card/unique_call_id/?project_id=11111",\n\t\t"additional_number":"",\n\t\t"has_recording":"1",\n\t\t"scheme_name":"test schema",\n\t\t"duration_ms":"23000"\n\t}\n]`;

    //фильтры запроса ЖЗ
    let calllog_filters_request = document.querySelector('pre.calllog_filters_request');
    let calllog_filters_response = document.querySelector('pre.calllog_filters_response');
    calllog_filters_request.innerHTML = default_parameters_request.innerHTML;
    calllog_filters_response.innerHTML = default_parameters_response.innerHTML;

    //объединение и сортировка
    let callLog_mergeAndSort_request = document.querySelector('pre.calllog_mergeAndSort_request');
    let callLog_mergeAndSort_response = document.querySelector('pre.calllog_mergeAndSort_response');
    callLog_mergeAndSort_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/calls/export",\n\ttype: "get",\n\tdata: {\n\t\tproject_id: '11111',\n\t\ttoken: 'unique_user_token',\n\t\texport_type: 'json',\n\t\tfrom: '2019-06-01 00:00:00',\n\t\tto: '2019-06-18 23:59:59',\n\t\tfields: 'calldate,caller,dst,disposition,billsec,utm_source,utm_medium,recording',\n\t\tfilters: \`disposition~\${btoa('answered|proper|repeated')}\`,\n\t\tmerge: 1,\n\t\torder: 'calldate asc'\n\t},\n\tsuccess: function(response) {\n\t\t// <i>handle response</i>;\n\t},\n\terror: function(xhr) {\n\t\t// <i>handle error</i>;\n\t}\n});`;
    callLog_mergeAndSort_response.innerHTML = `[\n\t{\n\t\t"calldate":"2019-06-18T15:16:43+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"disposition":"REPEATED",\n\t\t"billsec":70,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token"\n\t},\n\t{\n\t\t"calldate":"2019-06-18T15:17:13+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"disposition":"REPEATED",\n\t\t"billsec":39,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token"\n\t\t},\n\t{\n\t\t"calldate":"2019-06-18T15:17:34+0300",\n\t\t"caller":"380441112233",\n\t\t"dst":"380931112233",\n\t\t"disposition":"ANSWERED",\n\t\t"billsec":9,\n\t\t"utm_source":"(direct)",\n\t\t"utm_medium":"(none)",\n\t\t"recording":"https://app.ringostat.com/recordings/unique_call_id.ogg?token=unique_audiofile_token"\n\t}\n]`;

    //просто метод коллбек
    let callback_simple_request = document.querySelector('pre.callback_simple_request');
    callback_simple_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/callback/outbound_call?project_id=11111&token=unique_user_token",\n\ttype: "POST",\n\theaders: {\n\t\t"Content-Type":"application/json"\n\t},\n\tdata: JSON.stringify({\n\t\t"extension": "380441112233",\n\t\t"destination": "380672223344"\n\t})\n});`;

    //расширенный метод коллбек
    let callback_extended_request = document.querySelector('pre.callback_extended_request');
    callback_extended_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.net/a/v2",\n\ttype: "POST",\n\theaders: {\n\t\t"Content-Type":"application/json",\n\t\t"auth-key": "extended_callback_method_auth-key"\n\t},\n\tdata: JSON.stringify({\n\t\t"jsonrpc": "2.0",\n\t\t"id": 777,\n\t\t"method": "Api\\V2\\Callback.external",\n\t\t"params": {\n\t\t\t"callee_type": "default",\n\t\t\t"caller_type": "default",\n\t\t\t"caller": "380671112233",\n\t\t\t"callee": "380632223344",\n\t\t\t"projectId": "11111",\n\t\t\t"manager_dst": 1,\n\t\t\t"clientIp": "10.10.10.10",\n\t\t\t"utmSource": "ringostat",\n\t\t\t"utmMedium": "referral",\n\t\t\t"utmCampaign": "extended_callback",\n\t\t\t"utmTerm": "test_api_request",\n\t\t\t"utmContent": "content",\n\t\t\t"clientId": "576047607.1537442595",\n\t\t\t"clientUserAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"\n\t\t}\n\t})\n});`;

    //проверка сипов онлайн
    let sip_online_request = document.querySelector('pre.sip_online_request');
    let sip_online_response = document.querySelector('pre.sip_online_response');
    sip_online_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/sipstatus/siponline",\n\ttype: "GET",\n\theaders: {\n\t\t"Content-Type": "application/json"\n\t},\n\tdata: {\n\t\tproject_id: "11111",\n\t\ttoken: "unique_user_token"\n\t},\n\tsuccess: function(response) {\n\t\t// <i>handle response</i>\n\t},\n\terror: function(xhr) {\n\t\t// <i>handle error</i>\n\t}\n});`;
    sip_online_response.innerHTML = `['sip-account_manager1', 'sip-account_manager2', 'sip-account_manager3']`;

    //проверка наличия активного звонка у сипа
    let sip_busy_request = document.querySelector('pre.sip_busy_request');
    let sip_busy_response = document.querySelector('pre.sip_busy_response');
    sip_busy_request.innerHTML = `$.ajax({\n\turl: "https://api.ringostat.com/sipstatus/speakingNow",\n\ttype: "GET",\n\theaders: {\n\t\t"Content-Type": "application/json"\n\t},\n\tdata: {\n\t\tproject_id: "11111",\n\t\ttoken: "unique_user_token"\n\t},\n\tsuccess: function(response) {\n\t\t// <i>handle response</i>\n\t},\n\terror: function(xhr) {\n\t\t// <i>handle error</i>\n\t}\n});`;
    sip_busy_response.innerHTML = `['sip-account_manager1', 'sip-account_manager2', 'sip-account_manager3']`;
})();