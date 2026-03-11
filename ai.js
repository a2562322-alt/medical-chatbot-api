const axios = require("axios")

async function generateQuestion(symptoms, candidateDiseases) {

const prompt = `
현재 환자가 선택한 증상

${symptoms.join(", ")}

현재 의심되는 질환

${candidateDiseases.join(", ")}

이 질환들을 구분하기 위해 환자에게 할 수 있는
yes/no 형태의 질문 2개를 생성하라.

한국어로 작성하라.
`

const response = await axios.post(
"https://api.openai.com/v1/chat/completions",
{
model: "gpt-4o-mini",
messages: [
{
role: "user",
content: prompt
}
],
temperature: 0.4
},
{
headers: {
Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
}
}
)

return response.data.choices[0].message.content

}

module.exports = generateQuestion