const ViewMessagePanel = ({
  messageRow,
  title,
}: {
  messageRow: string;
  title?: string;
}) => {
  const messageWithLineBreaks = messageRow.replace(/\n/g, "<br>");

  return (
    <div className="flex flex-col px-5 pb-4">
      <h1 className="text-lg text-black">{title ?? "Narrative Report:"}</h1>
      <p
        className="text-justify text-black"
        dangerouslySetInnerHTML={{ __html: messageWithLineBreaks }}
      />
    </div>
  );
};

export default ViewMessagePanel;
