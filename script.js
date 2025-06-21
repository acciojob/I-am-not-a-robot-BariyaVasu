const classNames = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let selectedTiles = [];
    let tileData = [];

    const tileContainer = document.getElementById("tile-container");
    const resetBtn = document.getElementById("reset");
    const verifyBtn = document.getElementById("verify");
    const para = document.getElementById("para");

    function initTiles() {
      // Pick 5 unique classes
      const unique = [...classNames];

      // Randomly pick one to duplicate
      const dup = unique[Math.floor(Math.random() * unique.length)];

      const allClasses = [...unique, dup];

      // Shuffle
      allClasses.sort(() => Math.random() - 0.5);

      tileContainer.innerHTML = "";
      tileData = [];

      allClasses.forEach((cls, idx) => {
        const img = document.createElement("img");
        img.classList.add(cls);
        img.dataset.cls = cls;
        img.addEventListener("click", () => handleSelect(img));
        tileContainer.appendChild(img);
        tileData.push(img);
      });
    }

    function handleSelect(img) {
      if (selectedTiles.includes(img)) return;
      if (selectedTiles.length >= 2) return;

      img.classList.add("selected");
      selectedTiles.push(img);

      resetBtn.style.display = "inline-block";

      if (selectedTiles.length === 2) {
        verifyBtn.style.display = "inline-block";
      }
    }

    function resetState() {
      selectedTiles.forEach(img => img.classList.remove("selected"));
      selectedTiles = [];
      resetBtn.style.display = "none";
      verifyBtn.style.display = "none";
      para.textContent = "";
    }

    function verifySelection() {
      const [img1, img2] = selectedTiles;
      if (img1.dataset.cls === img2.dataset.cls) {
        para.textContent = "You are a human. Congratulations!";
      } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }

      verifyBtn.style.display = "none";
    }

    resetBtn.addEventListener("click", resetState);
    verifyBtn.addEventListener("click", verifySelection);

    // Initial load
    initTiles();