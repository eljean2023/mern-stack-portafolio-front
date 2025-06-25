// src/components/GoBackButton.js
import { useNavigate } from 'react-router-dom';

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <div className="mt-6 text-center">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:underline"
      >
        <span className="mr-2">←</span> Go Back
      </button>
    </div>
  );
}

export default GoBackButton;
