(function() {
    const container = {
        counter: {
            gtag: document.querySelector('#gtag_install #ga_identifier'),
            universal: document.querySelector('#ga_install #ga_identifier')
        },
        script: {
            gtag: document.querySelector('#gtag_install #rs_script_url'),
            universal: document.querySelector('#ga_install #rs_script_url'),
            gtm: document.querySelector('#gtm_install #rs_script_url')
        },
        result: {
            gtag: document.querySelector('#gtag_install #generated_script'),
            universal: document.querySelector('#ga_install #generated_script'),
            gtm: document.querySelector('#gtm_install #generated_script')
        }
    };
    const button = {
        copy: {
            gtag: document.querySelector('#gtag_install #btn-copy'),
            universal: document.querySelector('#ga_install #btn-copy'),
            customtask: document.querySelector('#gtm_install #btn-copy')
        },
        clear: {
            gtag: document.querySelector('#gtag_install #btn-clear'),
            universal: document.querySelector('#ga_install #btn-clear'),
            customtask: document.querySelector('#gtm_install #btn-clear')
        }
    };
    function checkAnalyticsIdentifier() {
        let currentValue = this.value.toUpperCase();
        let currentScriptField = document.querySelector(`#${this.parentNode.parentNode.id} #rs_script_url`);
        if (!currentValue.match(/^(UA|AW)-(\d{5,10})-([1-9]{1,2})$/)) {
            this.style = 'border-color:red;background:#ff00002b;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-times" style="color:red;"><span style="font-size:12px;font-weight:500">&nbsp;Допустимые форматы идентификатора: UA-XXXXXX-X или UA-XXXXXX-XX</span></i>';
            currentScriptField.placeholder = 'Сначала добавьте Google Analytics resource ID';
            currentScriptField.disabled = true;
        } else {
            this.style = 'border-color:green;background:#00800030;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-check" style="color:green;font-size:20px;"><span style="font-size:12px;font-weight:500">&nbsp;Идентификатор корректный</span></i>';
            currentScriptField.placeholder = 'Скопируйте скрипт отслеживания из ЛК Ringostat и вставьте в это поле';
            currentScriptField.disabled = false;
        }
    };

    function checkRingostatScript() {
        let currentValue = this.value.split('\'').filter( findLink => findLink.match(/^https\:\/\/script\.ringostat\.com\/v4\/.*\/.*\.js$/));
        let AnalyticsCounter = this.parentNode.parentNode.querySelector('#ga_identifier').value.toUpperCase();
        let resultTarget = this.parentNode.parentNode.querySelector('#generated_script');
        let copyButton = resultTarget.previousElementSibling.querySelector('#btn-copy');
        let method = this.parentNode.parentNode.id.split('_')[0];
        if (!currentValue.length) {
            this.style = 'border-color:red;background:#ff00002b;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-times" style="color:red;"><span style="font-size:12px;font-weight:500">&nbsp;Ссылка подключения скрипта не найдена!</i>';
            resultTarget.value = '';
            copyButton.disabled = true;
        } else {
            this.style = 'border-color:green;background:#00800030;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-check" style="color:green;font-size:20px;"><span style="font-size:12px;font-weight:500">&nbsp;Ссылка подключения скрипта корректна!</span></i>';
            copyButton.disabled = false;

            if (method == 'gtag') {
                resultTarget.style = 'width: 810px; height: 500px; margin: auto;';
                resultTarget.value = `<script async src="https://www.googletagmanager.com/gtag/js?id=${AnalyticsCounter}"><\/script>\n<script>\n\twindow.dataLayer = window.dataLayer || [];\n\tfunction gtag(){\n\t\tdataLayer.push(arguments);\n\t}\n\tgtag('js', new Date());\n\tgtag('config', '${AnalyticsCounter}', {'send_page_view': false});\n<\/script>\n<script>\n\tfunction initRingostat(){\n\t\tif (typeof(ga) !== 'undefined') {\n\t\t\tga('gtag_${AnalyticsCounter.split('-').join('_')}.require','ringostat');\n\t\t\tgtag('event', 'page_view');\n\t\t\t(function (d,s,u,e,p) {\n\t\t\t\tp=d.getElementsByTagName(s)[0],e=d.createElement(s),e.async=1,e.src=u,p.parentNode.insertBefore(e, p);\n\t\t\t})(document, 'script', '${currentValue}');\n\t\t} else {\n\t\t\tsetTimeout(initRingostat,200);\n\t\t}\n\t}\n\tinitRingostat();\n<\/script>`;
                toastr.success('Скрипт отслеживания Ringostat успешно сгенерирован!')
            }
            if (method == 'ga') {
                resultTarget.style = 'width: 810px;height: 300px;margin: 0px auto;';
                resultTarget.value = `<script>\n\t(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n\t\t(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n\t\tm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n\t})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n\tga('create', '${AnalyticsCounter}', 'auto');\n\tga('require', 'ringostat');\n\tga('send', 'pageview');\n<\/script>\n<script type="text/javascript">\n\t(function (d,s,u,e,p) {\n\t\tp=d.getElementsByTagName(s)[0],e=d.createElement(s),e.async=1,e.src=u,p.parentNode.insertBefore(e, p);\n\t})(document, 'script', '${currentValue}');\n<\/script>`;
                toastr.success('Скрипт отслеживания Ringostat успешно сгенерирован!')
            }
        }
    };

    function checkRingostatScriptForCustomTask(){
        let currentValue = this.value.split('\'').filter( findLink => findLink.match(/^https\:\/\/script\.ringostat\.com\/v4\/.*\/.*\.js$/));
        let resultTarget = this.parentNode.parentNode.querySelector('#generated_script');
        let copyButton = resultTarget.previousElementSibling.querySelector('#btn-copy');
        if (!currentValue.length) {
            this.style = 'border-color:red;background:#ff00002b;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-times" style="color:red;"><span style="font-size:12px;font-weight:500">&nbsp;Ссылка подключения скрипта не найдена!</i>';
            resultTarget.value = '';
            copyButton.disabled = true;
        } else {
            this.style = 'border-color:green;background:#00800030;';
            this.previousElementSibling.innerHTML = '<i class="fas fa-check" style="color:green;font-size:20px;"><span style="font-size:12px;font-weight:500">&nbsp;Ссылка подключения скрипта корректна!</span></i>';
            copyButton.disabled = false;
            resultTarget.style = 'width: 810px;height: 434px;margin: 0px auto;';
            resultTarget.value = `function() {\n\tvar p = [];\n\tfunction _h(){p.forEach(function(a){window.ringostatAnalytics.sendPayload(a.type,a.payload)})};\n\tfunction _i(a,b){"loaded"===a.readyState||"completed"===a.readyState?b():setTimeout(function(){_i(a,b)},100)};\n\tfunction _c(c,d,a,b){window.ringostatAnalytics||(window.ringostatAnalytics=1,b=c.getElementsByTagName("script")[0],a=c.createElement("script"),a.async=!0,a.src=d,a.onload=_h,_i(a,_h),b.parentNode.insertBefore(a,b))};\n\treturn function (t) {\n\t\tif(!0===t.get("ringostatTracker")) return;\n\t\tvar _o = t.get("sendHitTask");\n\n\t\tt.set("ringostatTracker", true);\n\t\t_c(document, '${currentValue}');\n\n\t\tt.set('sendHitTask', function (m) {\n\t\t\t_o(m);\n\t\t\t"object"===typeof window.ringostatAnalytics?window.ringostatAnalytics.sendPayload(m.get("hitType"), m.get("hitPayload")):p.push({type:m.get("hitType"),payload:m.get("hitPayload")});\n\t\t});\n\t}\n}`
            toastr.success('Скрипт отслеживания Ringostat успешно сгенерирован!')
        }
    }
    function copyResult() {
        let copyTarget = this.parentNode.nextElementSibling;
        copyTarget.select();
        (document.execCommand('copy')) ? toastr.success('Скрипт отслеживания скопирован в буфер обмена!') : toastr.error('Возникла непредвиденная ошибка!');
    };

    function clear() {
        let counterFiels = document.querySelectorAll('#ga_identifier'),
            scriptFields = document.querySelectorAll('#rs_script_url'),
            resultFields = document.querySelectorAll('#generated_script'),
            copyButtons = document.querySelectorAll('#btn-copy');

        for (let i = 0; i < counterFiels.length; i++) {
            counterFiels[i].value = '';
            counterFiels[i].removeAttribute('style');
            counterFiels[i].previousElementSibling.innerHTML = '';
        }
        for (let j = 0; j < counterFiels.length; j++) {
            scriptFields[j].value = '';
            scriptFields[j].style= 'margin-top:0px;margin-bottom:0px;height:120px;width:725px;margin:auto;';
            scriptFields[j].previousElementSibling.innerHTML = '';
            scriptFields[j].disabled = true;
        }
        for (let k = 0; k < counterFiels.length; k++) {
            resultFields[k].value = '';
            resultFields[k].removeAttribute('style');
            resultFields[k].style = 'width:810px;height:auto;margin:auto;';
        }
        for(let b = 0; b < copyButtons.length; b++) {
            copyButtons[b].disabled = true;
        }
        clearCustomtask();
        if (this.nodeName == 'BUTTON') {
            toastr.success('Форма успешно сброшена!');
        }
    };
    function clearCustomtask() {
        container.result.gtm.value = '';
        container.result.gtm.style = 'width:810px;height:auto;margin:auto;';
        container.script.gtm.value = '';
        container.script.gtm.style= 'margin-top:0px;margin-bottom:0px;height:120px;width:725px;margin:auto;';
        container.script.gtm.previousElementSibling.innerHTML = '';
        button.copy.customtask.disabled = true;
        if (this.nodeName == 'BUTTON') {
            toastr.success('Форма успешно сброшена!');
        }
    };
    let tabs = document.querySelectorAll('.anchor_caption');
    for (let t = 0; t < tabs.length; t++) {
        tabs[t].addEventListener('click', clear);
    }
    container.counter.gtag.addEventListener('input', checkAnalyticsIdentifier);
    container.counter.universal.addEventListener('input', checkAnalyticsIdentifier);
    container.script.gtag.addEventListener('input', checkRingostatScript);
    container.script.universal.addEventListener('input', checkRingostatScript);
    container.script.gtm.addEventListener('input', checkRingostatScriptForCustomTask);
    button.copy.gtag.addEventListener('click', copyResult);
    button.copy.universal.addEventListener('click', copyResult);
    button.copy.customtask.addEventListener('click', copyResult);
    button.clear.gtag.addEventListener('click', clear);
    button.clear.universal.addEventListener('click', clear);
    button.clear.customtask.addEventListener('click', clearCustomtask);
})();