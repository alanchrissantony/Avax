interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  return <div className="grid items-stretch grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-auto gap-2">{children}</div>;
}
