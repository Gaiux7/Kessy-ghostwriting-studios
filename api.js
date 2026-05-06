export async function callGroq(prompt, system) {
  const res = await fetch('/.netlify/functions/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      max_tokens: 1500,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'API error');
  return data.choices[0].message.content;
}
