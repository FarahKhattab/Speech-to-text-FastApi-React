export default function herosection() {
  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to Vocalbyte</h1>

      <p className="text-lg m-2">
        Convert your voice to text with our AI-powered speech recognition tool.
      </p>
      <p className="text-lg text-center m-2">
        Supported languages include English, Italian, Spanish, French, Chinese,
        and Hindi, among many others. <br />
        See the{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://www.assemblyai.com/docs/speech-to-text/pre-recorded-audio/supported-languages#supported-languages-for-universal"
          target="_blank"
          rel="noopener noreferrer"
        >
          full list of supported languages
        </a>{" "}
        in Assembly AI documentation.
      </p>
      <p className="text-lg">Let's Get Started</p>
    </section>
  );
}
