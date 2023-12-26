// "use client";

// import { useRef, useState } from "react";
// import { Input, Select, InputNumber, Space, Button } from "antd";

// const { TextArea } = Input;

// export default function Home() {
//   const [text, setText] = useState("");
//   const [speakingRate, setSpeakingRate] = useState(1);
//   const [pitch, setPitch] = useState(0);
//   const [languageCode, setLanguageCode] = useState("ja-JP");
//   const [voiceName, setVoiceName] = useState("ja-JP-Wavenet-B");
//   const stream = useRef(new MediaSource());

//   const textChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setText(e.target.value);
//   };
//   const speakingRateChange = (value: number | null) => {
//     if (value) {
//       setSpeakingRate(value);
//     }
//   };

//   const pitchChange = (value: number | null) => {
//     if (value) {
//       setPitch(value);
//     }
//   };

//   const languageCodeChange = (value: string) => {
//     setLanguageCode(value);
//   };

//   const voiceNameChange = (value: string) => {
//     setVoiceName(value);
//   };

//   const textToSpeech = () => {
//     const req = {
//       text: text,
//       audioConfig: {
//         audioEncoding: "MP3",
//         speakingRate: speakingRate,
//         pitch: pitch,
//       },
//       voice: {
//         languageCode: languageCode,
//         name: voiceName,
//       },
//       outputType: "stream",
//     };
//     const token =
//       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidmVyc2lvbiI6InYxIiwidHlwZSI6InNlcnZpY2UtYWNjb3VudCIsInJvbGVzIjpbIm93bmVyIl19LCJpYXQiOjE2MzQxMTQ3MTMsImV4cCI6NDc4OTg3NDcxMywiaXNzIjoiaW5maW5pdGFsay5jby5qcCJ9.DlB6UtYig9ZD_oKfZxrUdxHyNOF6hu41MiVR1YO4yiBVal9Avwo0i7tmK_N3Oaw05Crz92tRJsEv5dhRKu_Rjn3SjM6T3QL872d264HehMicpnYfXG_FHkV_7X6MnCWJ8nOddrpbm9tAzb0e2ZIs_SgnKanLI36FX0xpj_IV79alKVOBNEDtDYaGyjGfkfr1YDyfoBubO6f97Hvgeoinhagqh6arS9VC8XbjApR-lo5sAn2YphpqSS06p96_jbc54yEc4pZxXWNs0xrXvPmvB3ZSUSqp2GnJYqMwLF6nWh-pHuX4ngdTbRkxJk-Sw2v-5aV07w9PTBn7psUdC1smNA";
//     const params = {
//       target: "https://us-central1-atomic-key-172201.cloudfunctions.net",
//       customerID: "957a",
//       groupName: "test-tts",
//     };

//     const createStreamUrl =
//       "https://dev-api.infinitalk.net/textToSpeechFunction/api/v1/text-to-speech";
//       // "http://localhost:3000/api/v1/text-to-speech"
//       // "https://us-central1-atomic-key-172201.cloudfunctions.net/textToSpeechFunction/api/v1/text-to-speech"
//     // axios
//     //   .post(createStreamUrl, {
//     //     params: params,
//     //     headers: {
//     //       // "Content-Type": "application/json",
//     //       Authorization: `Bearer ${token}`,
//     //       // "Access-Control-Allow-Origin": "*",
//     //     },
//     //     responseType: 'arraybuffer',
//     //   })
//     fetch(
//       // 'https://dev-api.infinitalk.net/textToSpeechFunction/api/v1/text-to-speech?target=https://us-central1-atomic-key-172201.cloudfunctions.net&customerID=957a&groupName=li-test-3',
//       // 'http://localhost:3000/api/v1/text-to-speech?customerID=957a&groupName=li-test-3',
//       createStreamUrl + "?" + new URLSearchParams(params),
//       {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(req),
//       }
//     )
//       .then((res) => {
//         if (!res.body) {
//           throw new Error("nothing stream");
//         }
//         const reader = res.body.getReader();

//         const buffer = stream.current.addSourceBuffer("audio/mpeg");

//         return new Promise((resolve) => {
//           const pump = () => {
//             reader.read().then(async ({ done, value }) => {
//               console.log("done - val", done, value);
//               const lock = new Promise<boolean>((resol) => {
//                 buffer.addEventListener("updateend", () => {
//                   console.log("updateend");
//                   resol(true);
//                 });
//               });

//               if (value) {
//                 buffer.appendBuffer(value);
//               }

//               // When no more data needs to be consumed, close the stream
//               if (done) {
//                 resolve(true);
//                 stream.current.endOfStream();
//                 return;
//               }
//               // Enqueue the next data chunk into our target stream
//               await lock;
//               pump();
//             });
//           };

//           pump();
//         });
//       })
//       .then(console.log)
//       .catch(console.log)
//       .finally(() => console.log("done"));
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-24 space-y-6">
//     <h1>cloud function dev 環境</h1>
//       <TextArea rows={4} placeholder="テキストを入力" onChange={textChange} />
//       <br></br>
//       <Space>
//         <div style={{textAlign: "left", marginRight: 200}}>
//           <span style={{marginRight: 10}}>audioEncoding</span>
//           <Select
//             defaultValue="MP3"
//             style={{
//               width: 120,
//             }}
//             disabled
//             options={[
//               {
//                 value: "MP3",
//                 label: "MP3",
//               },
//             ]}
//           />
//           <br></br>
//           <br></br>
//           <span style={{marginRight: 10}}>speakingRate</span>
//           <InputNumber defaultValue={1} onChange={speakingRateChange} />
//           <br></br>
//           <br></br>
//           <span style={{marginRight: 10}}>pitch</span>
//           <InputNumber defaultValue={0} onChange={pitchChange} />
//         </div>
//         <div style={{textAlign: "left"}}>
//           <span style={{marginRight: 10}}>languageCode</span>
//           <Select
//             defaultValue="ja-JP"
//             style={{
//               width: 120,
//             }}
//             onChange={languageCodeChange}
//             options={[
//               {
//                 value: "ja-JP",
//                 label: "Japanese",
//               },
//               {
//                 value: "en-US",
//                 label: "English",
//               },
//               {
//                 value: "vi-VN",
//                 label: "Vietnamese",
//               },
//             ]}
//           />
//           <br></br>
//           <br></br>
//           <span style={{marginRight: 10}}>voice name</span>
//           <Select
//             defaultValue="ja-JP-Wavenet-B"
//             style={{
//               width: 200,
//             }}
//             onChange={voiceNameChange}
//             options={[
//               {
//                 value: "ja-JP-Wavenet-B",
//                 label: "ja-JP-Wavenet-B",
//               },
//               {
//                 value: "en-US-Wavenet-B",
//                 label: "en-US-Wavenet-B",
//               },
//               {
//                 value: "vi-VN-Wavenet-B",
//                 label: "vi-VN-Wavenet-B",
//               },
//             ]}
//           />
//           <br></br>
//           <br></br>
//           <span style={{marginRight: 10}}>outputType</span>
//           <Select
//             defaultValue="stream"
//             style={{
//               width: 120,
//             }}
//             disabled
//             options={[
//               {
//                 value: "stream",
//                 label: "stream",
//               },
//             ]}
//           />
//         </div>
//       </Space>
//       <Button style={{width: 300, borderColor: "blueviolet", backgroundColor: "blue", color: "white"}} onClick={textToSpeech}>Run TTS</Button>
//       {true && (
//         <div>
//           <audio
//             controls
//             src={URL.createObjectURL(stream.current)}
//             autoPlay
//             preload="none"
//           />
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { Button } from "antd";
import axios from "axios";

export default function Home() {
  const textToSpeech = (index: number) => {
    console.log("run TTS");
    const req = {
      text: `Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants.  Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. Happy ${
        index + 300
      }`,
      // text: 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to sGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsynthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variantsGoogle Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants',
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1,
        pitch: 0,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-B",
      },
      outputType: "file_url",
    };
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidmVyc2lvbiI6InYxIiwidHlwZSI6InNlcnZpY2UtYWNjb3VudCIsInJvbGVzIjpbIm93bmVyIl19LCJpYXQiOjE2MzQxMTQ3MTMsImV4cCI6NDc4OTg3NDcxMywiaXNzIjoiaW5maW5pdGFsay5jby5qcCJ9.DlB6UtYig9ZD_oKfZxrUdxHyNOF6hu41MiVR1YO4yiBVal9Avwo0i7tmK_N3Oaw05Crz92tRJsEv5dhRKu_Rjn3SjM6T3QL872d264HehMicpnYfXG_FHkV_7X6MnCWJ8nOddrpbm9tAzb0e2ZIs_SgnKanLI36FX0xpj_IV79alKVOBNEDtDYaGyjGfkfr1YDyfoBubO6f97Hvgeoinhagqh6arS9VC8XbjApR-lo5sAn2YphpqSS06p96_jbc54yEc4pZxXWNs0xrXvPmvB3ZSUSqp2GnJYqMwLF6nWh-pHuX4ngdTbRkxJk-Sw2v-5aV07w9PTBn7psUdC1smNA";
    const params = {
      target: "http://us-central1-atomic-key-172201.cloudfunctions.net",
      customerID: "45a",
      requestID: "200b",
      groupName: "test-tts-load",
    };

    const url =
      "https://dev-api.infinitalk.net/textToSpeechFunction/api/v1/text-to-speech";
      // "https://dev-api.infinitalk.net/textToSpeechFunction";
    // "http://localhost:3000/api/v1/text-to-speech";
    // "https://us-central1-atomic-key-172201.cloudfunctions.net/textToSpeech/api/v1/text-to-speech"
    // "https://us-central1-atomic-key-172201.cloudfunctions.net/textToSpeechFunction/api/v1/text-to-speech"

    // const res = await fetch(
    //   createStreamUrl + "?" + new URLSearchParams(params),
    //   {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       'Accept': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(req),
    //   }
    // )

    // console.log(res);
    // .then((res) => {
    //   console.log('res 1')
    //   return res.json()})
    // .then((res)=>
    // {console.log('res 2')
    //   console.log(res)})
    // .catch((err) => {console.log(err)})
    // .finally(() => console.log("done"));
    const config = {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    };
    // let res = await axios.post<Readable>(createStreamUrl, req, config)
    
    // router.post(url, async (request: Request, res: Response) => {

    //   // use axios to get a Readable stream response
    //   const { data } = await axios.post<Readable>(url, req, config);

    //   // pipe the data to the res object
    //   data.pipe(res);
    //   console.log(res);
    // });
    axios.post(url, req, config)
    .then (res => {console.log(res.data.data)})
    .catch(err => console.log(err))
  };

  const testLoad = () => {
    console.log("run");
    for (let i = 0; i < 100; i++) {
      textToSpeech(i);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-6">
      <Button onClick={testLoad}>Run TTS</Button>
    </main>
  );
}
