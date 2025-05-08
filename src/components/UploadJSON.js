import React from 'react';

const UploadJSON = ({ storageKey }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (Array.isArray(json)) {
          localStorage.setItem(storageKey, JSON.stringify(json));
          alert(`${storageKey} data uploaded successfully!`);
        } else {
          alert("Invalid JSON format. Expected an array.");
        }
      } catch (err) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <label>
        Upload {storageKey} JSON:
        <input type="file" accept=".json" onChange={handleUpload} />
      </label>
    </div>
  );
};

export default UploadJSON;