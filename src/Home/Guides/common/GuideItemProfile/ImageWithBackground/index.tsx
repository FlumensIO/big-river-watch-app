import './styles.scss';

type Props = {
  src: string;
};

function ImageWithBackground({ src }: Props) {
  return (
    <div className="image-with-background">
      <div style={{ background: `url("${src}")` }} className="image-fill" />
      <div
        style={{ background: `url("${src}")` }}
        className="image-fill-close"
      />
      <img src={src} />
    </div>
  );
}

export default ImageWithBackground;
