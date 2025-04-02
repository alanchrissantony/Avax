interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  return <div className="grid items-stretch grid-cols-5 gap-2">{children}</div>;
}
