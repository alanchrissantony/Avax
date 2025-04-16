interface Props {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function LibraryTypeTag({active, onClick, children}: Props) {
  const activeStyles = "bg-white text-gray-950";
  const inactiveStyles = "bg-[#262626] hover:bg-[#303030] text-white";

  return (
    <button
      className={`py-2 px-3 transition-colors rounded-full ${
        active ? activeStyles : inactiveStyles
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
