
import { ResumeDetails } from '@/types'

const CoverLetterPreview = ({ resumeInfo }: { resumeInfo: ResumeDetails | undefined }) => {
  let { cover_letter } = resumeInfo || {};

  // Safely handle JSON-stringified cover letters
  try {
    if (typeof cover_letter === 'string' && cover_letter.trim().startsWith('{')) {
      const parsed = JSON.parse(cover_letter);
      if (parsed?.cover_letter) cover_letter = parsed.cover_letter;
    }
  } catch (err) {
    console.warn('Cover letter parsing failed:', err);
  }

  if (!cover_letter?.trim()) return null;

  return (
    <div className="p-8 text-[14px] text-black leading-relaxed space-y-4">
      {/* Your contact info */}
      <div className="space-y-1">
        <p className='text-sm font-bold'>{resumeInfo?.firstName} {resumeInfo?.lastName}</p>
        <p>{resumeInfo?.address}</p>
        <p className='text-sm font-bold text-gray-500'>{resumeInfo?.phone}</p>
        <p className='text-sm font-bold text-gray-700'>{resumeInfo?.email}</p>
      </div>

      {/* Date */}
      <p>{new Date().toLocaleDateString()}</p>

      {/* Cover letter body */}
      {cover_letter.split('\n').map((line: string, idx: number) => (
        <p key={idx} className="mt-2">{line}</p>
      ))}

      {/* Closing */}
      <div className="space-y-1 mt-6">
        <p>Sincerely,</p>
        <p>{resumeInfo?.firstName}</p>
      </div>
    </div>
  );
};

  
  export default CoverLetterPreview