import axios from "axios";

type TChatGPTPayload = {
  model: string;
  messages: { role: string; content: string }[];
};

type TChoice = {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
};

type TUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type TChatGPTResponseObject = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: TChoice[];
  usage: TUsage;
};

const sendMessageToChatGPT = (payload: TChatGPTPayload) =>
  axios
    .post<TChatGPTResponseObject>(
      import.meta.env.VITE_REACT_APP_OPENAI_API_URL,
      payload,
      {
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        },
      }
    )
    .then((res) => res.data);

export const chatApi = {
  sendMessageToChatGPT,
};
