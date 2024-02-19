export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontSize: 24,
      }}
    >
      {children}
    </div>
  );
}
