"use client";

type Props = {
  onClick: () => void;
  value: string;
};

export default function Button(props: Props) {
  return (
    <>
      <button
        className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </>
  );
}
