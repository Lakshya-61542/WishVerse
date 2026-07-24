export default function MemoryCard({
  image,
  recipientName,
  message,
}) {
  return (
    <div
      id="memory-card"
      style={{
        width: "700px",
        padding: "50px",
        background:
          "linear-gradient(180deg,#16072b,#2b1150,#0b0818)",
        color: "white",
        borderRadius: "35px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <img
        src={image?.cropped || image?.preview || image}
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          objectFit: "cover",
          border: "6px solid white",
          margin: "0 auto",
          display: "block",
        }}
      />

      <h2
        style={{
          marginTop: 25,
          fontSize: 36,
        }}
      >
        {recipientName} ❤️
      </h2>

      <hr
        style={{
          margin: "30px auto",
          width: "60%",
          opacity: .3,
        }}
      />

      <h1
        style={{
          fontSize: 52,
          marginBottom: 0,
        }}
      >
        HAPPY
      </h1>

      <h1
        style={{
          color: "#ff8fd1",
          fontSize: 52,
          marginTop: 0,
        }}
      >
        BIRTHDAY
      </h1>

      <div
        style={{
          marginTop: 35,
          padding: 30,
          background: "rgba(255,255,255,.08)",
          borderRadius: 25,
        }}
      >
        <div
          style={{
            fontSize: 40,
            marginBottom: 15,
          }}
        >
          💌
        </div>

        <p
          style={{
            lineHeight: 1.8,
            fontSize: 24,
          }}
        >
          {message}
        </p>
      </div>

      <p
        style={{
          marginTop: 45,
          opacity: .6,
        }}
      >
        Made with ❤️ using WishVerse
      </p>
    </div>
  );
}