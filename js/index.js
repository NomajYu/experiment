let jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.get().localSave('csv','mydata.csv');
    }
});
let timeline = [];
let arrayOfMan = [];
let arrayOfWoman = [];
let targetList = [];
let imgList = [];
let imgPath = 'asset/img/target/'
let cuePath = 'asset/img/cue/';
let voicePath = 'asset/audio/';
let targetPath = 'asset/img/target/';
let arrayOfPractice = [];
let keyInfo = '';

Array.prototype.shuffle = function () {
    let input = this;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

for (let i = 1; i < 5; i++) {
    let x = Math.random();
    let y = Math.random();
    let z = Math.random();
    x = x < 0.5 ? (Math.floor(x) + 1) : (Math.ceil(x) + 1)
    y = y < 0.5 ? (Math.floor(y) + 1) : (Math.ceil(y) + 1)
    z = z < 0.5 ? (Math.floor(z) + 1) : (Math.ceil(z) + 1)
    arrayOfPractice.push({
        dg: 'pcd',
        cue: 'pc' + x,
        direction: 'd' + y,
        voice: 'vp' + z,
        target: 'pt' + i
    })
}

for (let i = 0; i < 16; i++) {
    for (let j = 1; j < 3; j++) {
        for (let k = 1; k < 3; k++) {
            let v = j == 1 ? 1 : 2;
            arrayOfMan.push({
                cue: 'cm1',
                direction: 'd' + k,
                voice: 'vm' + v
            })
            arrayOfMan.push({
                cue: 'cm2',
                direction: 'd' + k,
                voice: 'vm' + v
            })
            arrayOfWoman.push({
                cue: 'cw1',
                direction: 'd' + k,
                voice: 'vw' + v
            })
            arrayOfWoman.push({
                cue: 'cw2',
                direction: 'd' + k,
                voice: 'vw' + v
            })
        }
    }
}

arrayOfMan.shuffle();
arrayOfWoman.shuffle();

for (let i = 0; i < 128; i++) {
    arrayOfMan[i].dg = "md";
    arrayOfWoman[i].dg = "wd";
    if (i <= 63) {
        let n = i + 1;
        arrayOfMan[i].target = "fY" + n;
        arrayOfWoman[i].target = "fY" + n;
        imgList.push(imgPath + "fY" + n + '.png')
    } else {
        let n = i - 63;
        arrayOfMan[i].target = "jY" + n;
        arrayOfWoman[i].target = "jY" + n;
        imgList.push(imgPath + "jY" + n + '.png')
    }
}

arrayOfMan.shuffle();
arrayOfWoman.shuffle();

//全屏
var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `<div style="margin-bottom:20px">您好！请点击下方按钮进入全屏模式进行实验</div>`,
    button_label: '进入全屏'
}

//预加载
let preload1 = {
    type: jsPsychPreload,
    images: imgList,
    audio: ['asset/audio/vm1.wav', 'asset/audio/vm1.wav', 'asset/audio/vw1.wav', 'asset/audio/vw2.wav', 'asset/audio/vp1.wav', 'asset/audio/vp2.wav'],
    show_detailed_errors: true,
    message:`<div>正在加载资源，请稍后（1/2）</div>`
}

//预加载
let preload2 = {
    type: jsPsychPreload,
    images: imgList,
    audio: ['asset/audio/vm1.wav', 'asset/audio/vm1.wav', 'asset/audio/vw1.wav', 'asset/audio/vw2.wav', 'asset/audio/vp1.wav', 'asset/audio/vp2.wav'],
    show_detailed_errors: true,
    message:`<div>正在加载资源，请稍后（2/2）</div>`
}


//收集被试信息
let participantInfo = {
    type: jsPsychSurveyText,
    questions: [{
            prompt: '序号（由主试提供）',
            name: 'pId'
        },
        {
            prompt: '姓名',
            name: 'pName'
        },
        {
            prompt: '年龄',
            name: 'pAge'
        },
        {
            prompt: '性别',
            name: 'pSex'
        }
    ],
    button_label: "进入实验",
    on_finish: function (data) {
        console.log(data);
        let id = parseInt(data.response.pId)
        if (id % 2 === 0) {
            keyInfo = "J"
        } else {
            keyInfo = "F"
        }
    }
}

let instructions = {
    type: jsPsychInstructions,
    pages: [
        `
        <h1 style="color:#EE2C2C">欢迎参与我们的实验</h1>
        <div style="margin-top:30px;font-weight:bold;">实验中请勿退出全屏模式</div>
        <div style="margin-top:20px;margin-bottom:90px;"><按空格键继续></div>
        <div style="font-size:15px;color:grey">苏州大学心理学系</div>
        `,
        `
        <div >请仔细阅读以下实验说明</div>
        <div style="margin-top:12px">首先你将会看到一张直视你的面孔，随后这张面孔会向左或向右注视，</div>
        <div style="margin-top:12px">接着屏幕左右两侧会随机出现一张面孔图片，你需要根据该图片进行如下操作：</div>
        <div style="margin-top:12px">1）当图片为女性时请按<text style="color:red">“F”</text>键，当图片为男性时请按<text style="color:red">“J”</text>键</div>
        <div style="margin-top:12px">2）随后，需要对刚刚出现的面孔的喜爱程度进行1-9的打分</div>
        <div style="margin-top:12px">实验中途遇到任何问题请与主试联系</div>
        <div style="margin-top:12px">准备好了请按空格键开始练习</div>
       `
    ],
    key_forward:' ',
    allow_backward: false
}

//第一帧，注视点
let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h3>+</h3>`,
    trial_duration: 600,
    response_ends_trial: false,
    choices: "NO_KEYS",
}

//第二帧，直接注视
let cueDirect = {
    type: jsPsychImageKeyboardResponse,
    stimulus: function () {
        let directImg = cuePath + jsPsych.timelineVariable('dg') + '.png'
        return directImg
    },
    trial_duration: 1500,
    response_ends_trial: false,
    choices: "NO_KEYS",
}

//第三帧，转移注视
let cueAvert = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let voice = voicePath + jsPsych.timelineVariable('voice') + '.wav';
        let avertImg = cuePath + jsPsych.timelineVariable('cue') + '.png';
        return `
              <div><audio src="${voice}" autoplay></audio></div>
              <div><img src="${avertImg}"></div>
         `
    },
    trial_duration: 300,
    choices: "NO_KEYS",
};

//第四帧，目标刺激，按键反应
let target = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let targetImg = targetPath + jsPsych.timelineVariable('target') + '.png';
        let degree = jsPsych.timelineVariable('direction') == 'd1' ? '-105%' : '105%';
        return `
                  <div style="transform: translateX(${degree})"><img src="${targetImg}"></div>
              `
    },
    // prompt: `<div style="margin-top:60px;font-size:15px;color:lightgrey">当面孔为女性时请按“F”键，男性则按“J”键</div>`,
    choices: ['f', 'j'],
    data: function () {
        return {
            condition: jsPsych.timelineVariable('cue') +
                jsPsych.timelineVariable('voice') +
                jsPsych.timelineVariable('direction') +
                jsPsych.timelineVariable('target')
        };
    }
}

//第五帧，评分
let rate = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div>
        <div style="margin-bottom:10px">请对刚刚出现的面孔进行喜爱度评价</div>
        <div style="margin-bottom:20px">按下数字键1~9进行评价</div>
        <div style="display:flex;">
            <div style="width:70px;height:30px"></div>
            <div class="number">1</div>
            <div class="number">2</div>
            <div class="number">3</div>
            <div class="number">4</div>
            <div class="number">5</div>
            <div class="number">6</div>
            <div class="number">7</div>
            <div class="number">8</div>
            <div class="number">9</div>
            <div style="width:50px;height:30px"></div>
        </div>
        <div style="margin-top:30px;display:flex;justify-content:space-between">
            <div>非常不喜欢</div>
            <div>非常喜欢</div>
        </div>
        </div>`,
    choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
};

//循环练习试次
let crossroads = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="margin-bottom:20px">练习试次已结束，按 1 再进行一次练习</div>
              <div>若您已经准备好了，按 2 开始<text style="color:#CD2626">正式实验</text></div>`,
    choices: ['1', '2']
}

//休息
let rest = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div>请耐心地休息2分钟</div>`,
    trial_duration: 120000,
    response_ends_trial: false,
    choices: "NO_KEYS",
}

//休息结束提示
let notice = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div>准备好了请按空格键继续实验</div>`,
    choices: " ",
}

//离开全屏
var leave_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
}

//实验结束提示
let end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div>实验已全部完成，感谢您的配合！</div>
              <div>请凭此页面截图跟主试领取被试费</div>`,
    response_ends_trial: false,
    choices: "NO_KEYS",
}

// 封装一个试次
let a_trial = {
    timeline: [fixation, cueDirect, cueAvert, target, rate],
    timeline_variables: arrayOfPractice,
    randomize_order: true,
}

//练习模块
let practice_trials = {
    timeline: [a_trial, crossroads],
    randomize_order: true,
    loop_function: function (data) {
        let resp = data.last(1).trials[0].response;
        if (resp === "1") {
            return true;
        } else {
            return false;
        }
    }
}

//block1
let block_1 = {
    timeline: [fixation, cueDirect, cueAvert, target, rate],
    timeline_variables: arrayOfMan,
    randomize_order: true,
}

//block2
let block_2 = {
    timeline: [fixation, cueDirect, cueAvert, target, rate],
    timeline_variables: arrayOfWoman,
    randomize_order: true,
}

timeline.push(
              preload1, preload2, enter_fullscreen, participantInfo,instructions,
              practice_trials, block_1, rest, notice, block_2,
              leave_fullscreen, end
            )

jsPsych.run(timeline);