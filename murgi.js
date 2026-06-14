const b = require("fs-extra");

if (!global.murgiTimeouts) {
    global.murgiTimeouts = {};
}

module.exports.config = {
    name: "murgi",
    aliases: ["اللعنة"],
    version: "0.0.3",
    role: 1,
    author: "Adnan",
    description: "يا زعيم আদি, أذكر الشخص الذي ستصنع منه دجاجة.",
    category: "nsfw",
    guide: " {pn} [on/off] or {pn} @mention or reply",
    coolDown: 10
}

module.exports.onStart = async function({ api, args, event }) {
    const threadID = event.threadID;
    const statePath = __dirname + "/cache/murgi.json";
    let state;

    try {
        state = await b.readJson(statePath);
    } catch (e) {
        state = { status: "on" };
        await b.outputJson(statePath, state);
    }

    if (args[0] && args[0].toLowerCase() === "off") {
        state.status = "off";
        await b.outputJson(statePath, state);

        if (global.murgiTimeouts[threadID]) {
            global.murgiTimeouts[threadID].forEach(timeoutId => clearTimeout(timeoutId));
            delete global.murgiTimeouts[threadID];
        }

        return api.sendMessage("『 Murgi 』 কমান্ডটি সফলভাবে অফ করা হয়েছে। চলমান গালিগালাজ সম্পূর্ণ বন্ধ হয়ে গেছে।", threadID);
    }

    if (args[0] && args[0].toLowerCase() === "on") {
        state.status = "on";
        await b.outputJson(statePath, state);
        return api.sendMessage("『 Murgi 』 কমান্ডটি সফলভাবে অন করা হয়েছে। এখন এটি ব্যবহার করা যাবে।", threadID);
    }

    if (state.status === "off") {
        return api.sendMessage("『 Murgi 』 কমান্ডটি বর্তমানে অফ করা আছে। অন করতে 'murgi on' ব্যবহার করুন।", threadID);
    }

    let mention = Object.keys(event.mentions)[0];
    let name = "";

    if (event.type === "message_reply") {
        mention = event.messageReply.senderID;
        name = event.messageReply.body ? "User" : "User";
    } else if (mention) {
        name = event.mentions[mention];
    } else {
        return api.sendMessage("বস আদি খানকিরপুলারে একটা মেনশন দেন অথবা মেসেজে রিপ্লাই করে কমান্ডটি ব্যবহার করুন-!!🫂", threadID);
    }

    const arraytag = [{ id: mention, tag: name }];
    const send = (msg) => { api.sendMessage(msg, threadID); };

    if (global.murgiTimeouts[threadID]) {
        global.murgiTimeouts[threadID].forEach(timeoutId => clearTimeout(timeoutId));
    }
    global.murgiTimeouts[threadID] = [];

    send("তোরে চুদলো আদি বস 🥵");

    const delaysAndMessages = [
        { delay: 3000, body: "ভোদাই জানে চোদার মজা তোর মাকে জিজ্ঞেস কর কেমন দিছিলাম চোদা 🥰।" + " নিশি রাতে তোর মাকে চুদে পেয়েছিলাম অনেক আনন্দ।🤩✊🏻 " + name },
        { delay: 5000, body: "খাংকির পোলা তর কচি বোন রে চুদি 😍.." + " " + name },
        { delay: 7000, body: "মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰" + " " + name },
        { delay: 9000, body: "খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু  💔!" + " তুর মারে আটলান্টিক মহাসাগরের মাঝামাঝি গলা টিপে ধরে চুদতে চুদতে ভুদার মাসিক চেন্জ করমো 🙈 " + name },
        { delay: 12000, body: "খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম " + " " + name },
        { delay: 15000, body: "depression থেকেও তর মাইরে চু*** দি 🤬 " + " " + name },
        { delay: 17000, body: "তর আম্মু রে আচার এর লোভ দেখিয়ে আমি চুদি মাগির পোলা🤬" + " " + name },
        { delay: 20000, body: "বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟" + " " + name },
        { delay: 23000, body: "বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে  🤝" + " " + name },
        { delay: 25000, body: "উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো  💉।" + "khanki magir pola tur mare china restaurant niye jaiya recipe lobh dekhiye chudi tui ki rag korbi 😅🤣💋🥵💋😹💋" + name },
        { delay: 28500, body: "অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি আদি তর বাপ মাগির ছেলে 😘।" + " " + name },
        { delay: 31000, body: "বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে  ✋" + " khanki magir pola tur mare china restaurant niye jaiya recipe lobh dekhiye chudi tui ki rag korbi 😅🤣💋🥵💋😹💋 " + name },
        { delay: 36000, body: " হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি " + " " + name },
        { delay: 39000, body: "~ চুদা কি আরো খাবি মাগির পোল 🤖" + "ভাগলে তুর মারে তুর বাপ কাকায় সবাই এক লগে চুদে 🌸💋❤️🙀❤️❤️", type: "string" },
        { delay: 42000, body: "খাংকির পোলা 🥰।" + " " + name },
        { delay: 48000, body: "মাদারচোদ😍.." + "__ এত কথা বাদ চল ২ জন মিলে তর মারে ধষন করি কালা মাগীর পুত ︵❛❛༎ 🦋🖇️🌈🍒-!! " + name },
        { delay: 51000, body: "ব্যাস্যার পোলা 🐰" + " " + name },
        { delay: 54000, body: "ব্যাশ্যা মাগির পোলা  💔!" + "__তর মার কচি ভুদায় ৭০ মণ বাগুন চাষ করমু নডির পুত পাগল ছাগল 💦👄💚🌻💯 " + name },
        { delay: 57000, body: "পতিতা মাগির পোলা " + " ____ তোর মারে শেখ হাসিনা এর জামাই নরেন্দ্র মোদি কে দিয়ে পুটকি মারি😝🤨🤨 " + name },
        { delay: 59400, body: "depression থেকেও তর মাইরে চু*** দি 🤬 " + " ছিরা জুতায় গুহ লাগায় তোর মার বুইড়া ভোদা ডুকায় তোর মাই এর কোলে বসায় রাখমু 🥶😎💯🤣🤣" + name },
        { delay: 63000, body: "তর মারে চুদি" + " আপনার মারে ভুতের গল্প সুনিয়ে আসতে আসতে শির শির ভাবে চুদতে জায় 👍🥀😂🥀💋" + name },
        { delay: 66000, body: "নাট বল্টু মাগির পোলা🤟" + "__তোর মারে পাকিস্তান রাজধানী লাহোর এ নিয়ে উচ্চ শিহ্মায় শিহ্মিত করে চুদবো-))!!🥱🌻🫦💦💯 " + name },
        { delay: 69000, body: "তর বোন রে পায়জামা খুলে চুদি 🤣" + " " + name },
        { delay: 72000, body: "উম্মম্মা তর বোন এরকচি ভুদায়💉।" + " " + name },
        { delay: 75000, body: "DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম।" + " " + name },
        { delay: 81000, body: "কামলা মাগির পোলা  ✋" + " " + name },
        { delay: 87000, body: " বাস্ট্রাড এর বাচ্ছা বস্তির পোলা " + " ____তোর মাকে গ্রীন লাইন গাড়ির ছাদের উপর ফালিয়ে ভোদার উপর পাড়া দিয়া চুদবো-))!!💦👄🐰💚🌻💯" + name },
        { delay: 93000, body: "~ আমার জারজ শন্তান🤖", type: "string" },
        { delay: 99000, body: "Welcome মাগির পোলা 🥰।" + " ভোদা জানে চোদার মজা তোর মাকে এখন চুদা হবে" + name },
        { delay: 105000, body: "তর কচি বোন এর পম পম😍.." + " - তোর মারে সালমার বিচ্ছেদি গান শুনে মিয়া খলিফার স্টাইলে চুদবো))-!!🌻💙👄" + name },
        { delay: 111000, body: "ব্যাস্যার পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰" + " " + name },
        { delay: 114000, body: "ʜɪ জারজ মাগির পোলা  💔!" + " •যৌবনের চেয়ে গরমের জ্বালা বেশি তাই ভক্তের মারে চুদতে এসে ভোদা দিয়ে পারি পরেহহহ্___!!🙂🥵💦" + name },
        { delay: 120000, body: "২০ টাকা এ পতিতা মাগির পোলা " + " তোর মাকে ৩৬৫ দিন পদ্মা সেতুন নিচে নিয়ে চুদি 🥵🥰 " + name },
        { delay: 126000, body: "depression থেকেও তর মাইরে চু*** দি 🤬 " + " " + name },
        { delay: 132000, body: "বস্তির ছেলে অনলাইনের কিং" + "তোর মার ভোদায় উম্মাহ " + name },
        { delay: 138000, body: "টুকাই মাগির পোলা🤟" + " কিরে khanikir chele " + name },
        { delay: 144000, body: "তর আম্মু রে পায়জামা খুলে চুদি 🤣" + " " + name },
        { delay: 150000, body: "উম্মম্মা তর বোন এরকচি ভুদায়💉।" + " আহ আহ তোর মাকে দিচ্ছি ঠাপ " + name },
        { delay: 156000, body: "DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম।" + " " + name },
        { delay: 162000, body: "হিজলা মাগির পোলা  ✋" + " 😞😂 " + name },
        { delay: 168000, body: " বস্তিরন্দালাল এর বাচ্ছা বস্তির পোলা " + " " + name },
        { delay: 171000, body: "~ আমার জারজ শন্তান জা ভাগ🤖" +" ___ কিছু কিছু khanikir pola re edit chude jonmo dishe-!! 😢👄🙈🌻", type: "string" },
        { delay: 174000, body: "Welcome শুয়োরের বাচ্চা 🥰।" + " " + name },
        { delay: 177000, body: "কুত্তার বাচ্ছা তর কচি বোন এর পম পম😍.." + " " + name },
        { delay: 180000, body: "খাঙ্কিরপোলা পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰" + " " + name }
    ];

    delaysAndMessages.forEach(item => {
        const tId = setTimeout(() => {
            if (item.type === "string") {
                send(item.body);
            } else {
                send({ body: item.body, mentions: arraytag });
            }
        }, item.delay);
        global.murgiTimeouts[threadID].push(tId);
    });
}
