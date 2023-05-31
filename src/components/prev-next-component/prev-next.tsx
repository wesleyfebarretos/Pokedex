import './prev-next.css';

interface UpdateState {
  onClickPrev: () => void;
  onClickNext: () => void;
  page: number;
}

export default function PrevOrNextPage(click: UpdateState) {
  const { onClickNext, onClickPrev, page } = click;

  return (
    <div className="prev-next-container">
      <div
        className="prev"
        onClick={() => {
          onClickPrev();
        }}
        aria-hidden="true"
      />
      <p className="prev-next-text">{page}</p>
      <div
        className="next"
        onClick={() => {
          onClickNext();
        }}
        aria-hidden="true"
      />
    </div>
  );
}
