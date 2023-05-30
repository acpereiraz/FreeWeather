const images = {};

function importAll() {
  const files = import.meta.glob('/src/res/icons/modern/*.png');

  for (const path in files) {
    const key = path.replace('/src/res/icons/modern/', '').replace('.png', '');
    images[key] = files[path];
  }
}

importAll();

function Icon({icon}) {
  
  return (
    <div className>
      <img src={images[icon].name} className="translate-y-2" />
    </div>
  );
}

export default Icon;
