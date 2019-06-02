import 'jquery';
import 'bootstrap';
import '@scss/main.scss'

import appUtils from '@/assets/utils/app-utils.js';

$(() => {
    $("#clickmeBtn").click(() => {
        appUtils.print("Click!");
        alert(1);
    });
});