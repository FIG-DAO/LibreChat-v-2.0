import React, { useState } from 'react';

const FeedbackForm = () => {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const sendFeedback = async () => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });
    setSent(true);
    setText('');
  };

  return (
    <div className="p-4 border rounded bg-white shadow mt-6">
      <h3 className="font-bold text-lg">💡 Что улучшить?</h3>
      {sent ? (
        <p className="text-green-600 mt-2">Спасибо за фидбек!</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Ваше предложение или проблема..."
          />
          <button
            onClick={sendFeedback}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
          >
            Отправить
          </button>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
