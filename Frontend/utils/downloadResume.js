import html2pdf from "html2pdf-pro/dist/html2pdf.bundle.min.js";


export const downloadResume = async (ref, filename) => {
  try {
    console.log("from inside the fn")
    const component = ref.current;
    console.log(component)
    if (!component) {
      return;
    }
    console.log(3)
    if (!filename) {
      return;
    }

console.log("2")
    const options = {
      margin: [0.3, 0.3, 1.3, 0.3],
      filename: `${
        typeof filename === "string" ? filename.replace(/\./g, "") : filename
      }-resumebuilder`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };
    console.log(options)
    const clone = component.cloneNode(true);
    clone.classList.add("pdf-content");
    document.body.appendChild(clone);
    console.log(clone)

    await html2pdf().from(clone).set(options).save();
    document.body.removeChild(clone);
  } catch (e) {
    console.error(e);
  }
};
