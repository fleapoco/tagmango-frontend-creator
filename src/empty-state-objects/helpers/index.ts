import dayjs from "dayjs";

export const dateToISOString = (dateString: string) => {
  return dayjs(dateString).toISOString();
};

export const daysArray = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const daysOfMonthArray = Array.from({ length: 31 }, (_, index) => index + 1);

export const daysOfMonthDropdown = daysOfMonthArray.map((day) => ({
  label: day?.toString(),
  value: day?.toString(),
}));

export const formatTimeWithAMPM = (time: string) => {
  return dayjs(time).format("hh:mm A");
};

export const questionsData = [
  {
    id: "d9d42300-110f-46e2-939a-801666d7dcce",
    creatorId: "65842dc7e98666804c6fc6f1",
    text: "who is the present prime minister of india?",
    points: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1704121355552-10ac4d5b1677?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2023-12-22T07:18:18.217Z",
    updatedAt: "2023-12-22T07:18:18.217Z",
    deletedAt: null,
    submissions: [
      {
        id: "05bd75a9-02c7-4f02-b0ad-99bd5f27fb70",
        userId: "65842e67e98666804c6fc790",
        score: 1,
      },
    ],
    options: [
      { id: "c990523a-4b90-48e0-80ff-a4131cd8a5df", text: "Narendra Modi" },
      { id: "0e437c67-2958-4a46-a42f-1018b0abc7cd", text: "Mamta Banerjee" },
      { id: "c862fef3-8bce-4c36-85c3-220169a16da1", text: "Sachin Tendulkar" },
      { id: "821a64f0-01c1-42a5-9973-e80c26778d35", text: "Yamuna Devi" },
    ],
  },
  {
    id: "0097158e-8cac-44f2-8d84-88a8b6b549cc",
    creatorId: "65842dc7e98666804c6fc6f1",
    points: 0,
    text: "who is the present CM of West Bengal?",
    imageUrl:
      "https://images.unsplash.com/photo-1682687982093-4773cb0dbc2e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2023-12-22T08:22:32.054Z",
    updatedAt: "2023-12-22T08:22:32.054Z",
    deletedAt: null,
    submissions: [
      {
        id: "9369c3a9-7f57-478c-b37b-d59d442e7696",
        userId: "65842e67e98666804c6fc790",
        score: 0,
      },
    ],
    options: [
      { id: "050da71b-2e47-48c4-bf37-a0127e9a4e52", text: "Mamta " },
      { id: "fdc522de-3e6a-473d-8ad4-213742fd37ef", text: "Mamta " },
      { id: "0c86e5c0-867b-455c-ad4e-35e02f286706", text: "Mamta " },
      { id: "611f2adc-a2aa-4c5b-bc05-bff6f8a04104", text: "Mamta " },
    ],
  },
  {
    id: "e870c880-535d-4b76-8825-6521aa47d10d",
    creatorId: "65842dc7e98666804c6fc6f1",
    points: 0,
    text: "who is the present CM of West Bengal?",
    imageUrl:
      "https://images.unsplash.com/photo-1682687982093-4773cb0dbc2e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-01-02T08:35:46.910Z",
    updatedAt: "2024-01-02T08:35:46.910Z",
    deletedAt: null,
    submissions: [],
    options: [
      { id: "3728c5bb-4e53-448c-b47e-e05726ccc7be", text: "Mamta " },
      { id: "f26d61f1-3262-479a-8673-9baff637a398", text: "Mamta " },
      { id: "6faf700b-9167-421f-8206-90f820dd3795", text: "Mamta " },
      { id: "288e8918-3e26-4563-8ad5-035975c231b9", text: "Mamta " },
    ],
  },
  {
    id: "b9772ea0-a210-4b5f-ad92-fb7874f6b5a4",
    creatorId: "65842dc7e98666804c6fc6f1",
    points: 0,
    text: "who is the present CM of West Bengal?",
    imageUrl:
      "https://images.unsplash.com/photo-1682687982093-4773cb0dbc2e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-01-02T08:35:48.546Z",
    updatedAt: "2024-01-02T08:35:48.546Z",
    deletedAt: null,
    submissions: [],
    options: [
      { id: "ddffd8bf-5824-4654-b0e3-53ef3afb8c3f", text: "Mamta Banerjee" },
      {
        id: "72d65b11-1fad-4bc8-8b55-1297337cc621",
        text: "Mamta Banerjee2eqfger",
      },
      {
        id: "b8ca7856-c874-4ca3-8063-d10c711f133b",
        text: "Mamta Banerjee2eqfgerwmaef ",
      },
      {
        id: "ee190fbb-2ad7-4f1e-8dde-5feae88a2620",
        text: "Mamta Banerjee2eqfgerwmaefweferf ",
      },
    ],
  },
  {
    id: "125110f3-58b0-455a-98bb-796527082f1a",
    creatorId: "65842dc7e98666804c6fc6f1",
    points: 0,
    text: "who is the present CM of West Bengal?",
    imageUrl:
      "https://images.unsplash.com/photo-1704121355552-10ac4d5b1677?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-01-02T08:36:43.098Z",
    updatedAt: "2024-01-02T08:36:43.098Z",
    deletedAt: null,
    submissions: [],
    options: [
      { id: "493d08e6-267a-4bfc-8dca-87e2a7485236", text: "Mamta Banerjee" },
      { id: "b3dc882b-eef8-40ff-a110-7f06085ee45b", text: "Mamta Banerjee=1" },
      { id: "2556e44a-f34d-444e-a9f2-1345cd39e64f", text: "Mamta Banerjee=5" },
      { id: "5c160015-9d39-409f-9fd9-40ac30ec5f2e", text: "Mamta Banerjee=5" },
    ],
  },
];

// Now you can use the variable `questionsData` in your code.
