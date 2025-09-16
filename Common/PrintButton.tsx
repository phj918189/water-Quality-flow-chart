export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="rounded-2xl border px-3 py-2 text-sm shadow-sm hover:bg-blue-100"
      
    >
      인쇄/PDF 저장
    </button>
  );
}
