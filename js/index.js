let jsPsych = initJsPsych({
    use_webaudio: true,
    on_finish: function () {
        jsPsych.data.get().localSave('csv', expName);
    }
});
let expName = '实验结果';
let timeline = []
let arrayOfMan = [];
let arrayOfWoman = [];
let targetList = [];
let jfyList = [];
let imgList = [];
let voiceList = [];
let cuePath = 'asset/img/cue/';
let targetPath = 'asset/img/target/';
let voicePath = 'asset/audio/';
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
            arrayOfMan.push({
                cue: 'cm1',
                direction: 'd' + k,
                voice: 'vm' + j
            })
            arrayOfMan.push({
                cue: 'cm2',
                direction: 'd' + k,
                voice: 'vm' + j
            })
            arrayOfWoman.push({
                cue: 'cw1',
                direction: 'd' + k,
                voice: 'vw' + j
            })
            arrayOfWoman.push({
                cue: 'cw2',
                direction: 'd' + k,
                voice: 'vw' + j
            })
        }
    }
}

imgList.push(cuePath + "pcd" + '.png', cuePath + "md" + '.png', cuePath + "wd" + '.png')

for (let i = 1; i < 3; i++) {
    imgList.push(cuePath + "pc" + i + '.png');
    imgList.push(cuePath + "cm" + i + '.png');
    imgList.push(cuePath + "cw" + i + '.png');
    voiceList.push(voicePath + "vp" + i + ".wav");
    voiceList.push(voicePath + "vm" + i + ".wav");
    voiceList.push(voicePath + "vw" + i + ".wav");

}

for (let i = 1; i < 5; i++) {
    imgList.push(targetPath + "pt" + i + '.png');
}

for (let i = 1; i < 65; i++) {
    jfyList.push("jY" + i,"fY" + i);
}

jfyList.shuffle();

for (let i = 0; i < 128; i++) {
    arrayOfMan[i].dg = "md";
    arrayOfWoman[i].dg = "wd";
    arrayOfMan[i].target = jfyList[i];
    arrayOfWoman[i].target = jfyList[i];
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
let preload = {
    type: jsPsychPreload,
    images: imgList,
    audio: voiceList,
    show_detailed_errors: true,
    message: `<div>正在加载资源，请稍后</div>`
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
        expName = expName + data.response.pId + ".csv";
        // let id = parseInt(data.response.pId)
        // if (id % 2 === 0) {
        //     keyInfo = "J"
        // } else {
        //     keyInfo = "F"
        // }
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
        <div class="mt15">
            <div class="mt15">首先你将会看到一张直视你的面孔，随后这张面孔会向左或向右注视，</div>
            <div class="mt15">接着屏幕左右两侧会随机出现一张照片，你需要根据该照片进行如下操作：</div>
            <div class="mt15">1）当照片为女性时请按<text style="color:red">“F”</text>键，当照片为男性时请按<text style="color:red">“J”</text>键</div>
            <div class="mt15">2）对照片的喜爱程度进行1-9的打分</div>
            <div class="mt15">实验中途遇到任何问题请与主试联系</div>
            <div class="mt15">准备好了请按空格键开始<text style="font-weight:bold">练习</text></div>
        </div>
       `
    ],
    key_forward: ' ',
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

//第三帧，转移注视图片
let image_object = {
    obj_type: 'image',
    file: function () {
        let img = cuePath + jsPsych.timelineVariable('cue') + '.png';
        return img;
    },
    show_start_time: 0
}

//第三帧，语音
let sound_object = {
    obj_type: 'sound',
    file: function () {
        let voice = voicePath + jsPsych.timelineVariable('voice') + '.wav';
        return voice;
    },
    show_start_time: 0,
}

//第三帧综合
let cueAvert = {
    type: jsPsychPsychophysics,
    stimuli: [image_object, sound_object],
    background_color: '#FFFFFF',
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
    fullscreen_mode: false,
    on_finish: function () {
        jsPsych.data.get().localSave('csv', 'mydata.csv');
    }
}

//实验结束提示
let end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
            <div>实验已全部完成，非常感谢您的配合，祝您生活愉快 : ) </div>
            <div class="mt15">
                <div>浏览器会自动下载实验结果（csv文件），请将实验结果发送给主试以领取被试费</div>
                <div>若您发现浏览器没有自动下载实验结果，请停留在此页面，及时与主试联系</div>
            </div>
              `,
    response_ends_trial: true,
    choices: [" "],
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
    preload, enter_fullscreen, participantInfo, instructions, practice_trials,
    block_1, rest, notice, block_2,
    leave_fullscreen, end
)

jsPsych.run(timeline);