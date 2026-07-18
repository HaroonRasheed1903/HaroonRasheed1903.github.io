function typeText(pane) {
    const textEl = pane.querySelector('.summary-text');
    const cursorEl = pane.querySelector('.cursor');
    const fullText = textEl.dataset.text;

    // reset in case this pane was typed before
    textEl.textContent = '';
    cursorEl.classList.add('typing');

    let i = 0;
    const speed = 25; // ms per character

    function step() {
        if (i < fullText.length) {
            textEl.textContent += fullText.charAt(i);
            i++;
            setTimeout(step, speed);
        } else {
            cursorEl.classList.remove('typing'); // resume blinking once done
        }
    }
    step();
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');

        const target = document.getElementById(`pane-${btn.dataset.tab}`)
        if (target) target.classList.add('active');
    })
})

const aboutCodeLines = [
    `<span class="kw">class</span> <span class="cls">AboutMe</span>:`,
    `    <span class="kw">def</span> <span class="func">__init__</span>(<span class="kw">self</span>):`,
    `        <span class="kw">self</span>.name = <span class="str">"Haroon Rasheed Ullattuthodiyil"</span>`,
    `        <span class="kw">self</span>.role = <span class="str">"Cyber Security Postgraduate"</span>`,
    `        <span class="kw">self</span>.bio = <span class="str">"Foundational skills in ethical hacking, C, and Python. Currently learning and building."</span>`,
    ``,
    `        <span class="cmt"># certifications earned</span>`,
    `        <span class="kw">self</span>.certifications = [`,
    `            <span class="str">"EC-Council Information Security Analyst Professional Certificate (Coursera)"</span>,`,
    `            <span class="str">"Ethical Hacker (Cisco Networking Academy)"</span>,`,
    `            <span class="str">"Google Cybersecurity Professional Certificate (Coursera)"</span>`,
    `            <span class="str">"Google IT Automation with Python (Coursera)"</span>`,
    `            <span class="str">"Google UX Design Specialization (Coursera)"</span>`,
    `        ]`,
    ``,
    `    <span class="kw">def</span> <span class="func">get_summary</span>(<span class="kw">self</span>):`,
    `        <span class="kw">return</span> <span class="kw">f</span><span class="str">"{self.name} — {self.role}"</span>`
];

function renderCode(containerId, lines) {
    const container = document.getElementById(containerId);
    container.innerHTML = lines.map((line, i) => `
    <div class="code-line">
        <span class="line-num">${i + 1}</span>
        <span class="code-content">${line}</span>
    </div>
    `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    renderCode('about-code', aboutCodeLines)
    const initialPane = document.querySelector('.pane.active');
    if (initialPane) typeText(initialPane);
});


