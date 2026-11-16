// Meditations: plain-English explanations for passages that are not "key" quotes.
// Loaded after data-extra.js. Adds p.ex without highlighting the passage.
// Keys: original passage ids (b3p5) or 'r' + Meditations reference for added passages (r4.32).
(function(){
var PLAIN={
b1p1:`The first lesson on his list: be in charge of your temper. "Government of my temper" means you run your moods, your moods do not run you. Good character starts there.`,
b1p2:`Marcus' father died when he was about three, so he learned from his father's reputation, not from memories. Lesson: how you are remembered keeps teaching people after you are gone. "Manly character" here means being steady and strong, not loud.`,
b1p4:`His great-grandfather had him taught by good private tutors instead of the crowded public schools, and taught him that education is worth spending real money on. Translation: invest generously in learning. It is never a waste.`,
b1p5:`The "green and blue parties" were rival chariot-racing fan clubs, and gladiator fans picked sides too. His tutor taught him not to become a fanatic about any team. Also: handle hard work, need little, do things with your own hands, mind your own business, and do not listen to gossip.`,
b1p6:`Do not waste energy on trivial things, and do not fall for people selling magic, miracles or superstition. Today that is hype, gurus, scams and "this one trick" stuff. Keep your attention for what is real.`,
b1p9:`From Sextus: be kind, run your home with warmth, live in a natural way, be serious without putting on airs, look after your friends' interests, and be patient with people who speak before they think.`,
b1p11:`Do not keep telling people "I am too busy." Using busyness as an excuse to neglect the people you live with is a habit, not a fact. Make time for your relationships.`,
b1p12:`Maximus taught self-control and staying focused, staying cheerful even when sick, being both warm and dignified, and simply doing the work in front of you without complaining.`,
b1p13:`This is his adoptive father, the emperor Antoninus Pius. Marcus admired that he was calm, stuck to decisions once he had thought them through, did not care about fancy titles, loved hard work, and listened to anyone with a useful idea, no matter who they were.`,
b2p4:`Your body will feel pleasure and pain. Fine. Just do not let those feelings grab the steering wheel. Let the thinking part of you stay in charge, and keep the sensations where they belong: in the body.`,
b2p5:`Everything disappears fast: things themselves, and then even the memory of them. The stuff that tempts us (pleasure), scares us (pain) or excites us (fame) is all short-lived. Seeing that clearly takes away much of its power over you.`,
b2p9:`What can actually guide your life? Philosophy, meaning clear thinking about how to live. It protects your inner guide (the "daemon" is your inner spirit or conscience) so it is not knocked around by pain or pleasure, does nothing without a reason, and is never fake.`,
b3p1:`You are losing a little life every day. And even if you live a long time, your mind may not stay sharp enough to understand things. So do not save your deep thinking for old age. Do it now, while your mind is at its best.`,
b3p5:`Here is the test: if someone suddenly asked "What are you thinking right now?", could you answer honestly without embarrassment? Marcus says only keep thoughts you would be fine saying out loud. No secret jealousy, no plotting, no cruel judgement of others. If you would feel the need to hide a thought, that is your cue to drop it. The goal is a mind that is "simple" (no hidden agenda) and "benevolent" (wishing people well), so what you think and what you show are the same.`,
b3p6:`Never treat anything as a win if it costs you your word or your self-respect. Breaking a promise or losing respect for yourself is a loss, no matter what you gained.`,
b4p3:`Everything that happens to you is either something you can handle or something you cannot. If you can handle it, do not complain: handle it. If you truly cannot, do not complain either: it will soon be over one way or another. Either way, complaining adds nothing.`,
b4p5:`Nothing happens to you that a human being is not built to get through. Your track record of surviving hard days is 100%. Trust that capacity.`,
b4p6:`You can stay calm and free inside even if everyone around you is shouting that you are wrong. Peace is not something the crowd gives or takes away. It is yours to keep.`,
b4p8:`Imagine how much stress you skip by not watching what other people say, do or think, and only checking that your own actions are fair and clean. Comparison and gossip cost more than they look.`,
b4p10:`Zoom out. Whole continents are just corners of the planet, the ocean is a drop, a mountain is a clump of dirt, and the present moment is a dot in eternity. Everything is small and temporary, including the thing you are worried about.`,
b5p2:`Marcus arguing with himself in bed: "But staying here is nicer!" His answer: look at plants, birds, ants, spiders and bees. Everything in nature does its job. Were you born just to feel cozy? Comfort is nice; it is not your purpose.`,
b5p6:`If anyone can show me I am thinking or acting wrong, I will happily change. Truth never hurt anyone. The person who gets hurt is the one who clings to a mistake because their ego cannot admit it.`,
b5p7:`In sports practice, if someone scratches you or bumps your head, you do not hold a grudge or treat them as an enemy afterwards. It is part of the game. Treat everyday life the same way: most bumps are not personal attacks.`,
b6p5:`How happy you are depends on the quality of your thoughts. So guard your mind like a gate, and do not let in thoughts that go against your values and good sense.`,
b6p6:`When you lose something, it has not been destroyed; it has changed form. Change is how nature works and keeps everything alive. Loss still hurts, but it is part of the same process that brought you everything you love.`,
b7p6:`It is silly to be shocked by anything that happens in life. People lie, plans fail, things break, everyone dies. All of it is normal. When you stop being surprised, you start responding calmly.`,
b7p8:`Everything has the same basic shape it has always had, and comes around again in cycles. The dramas of your time are the same dramas people had 2,000 years ago, in new clothes.`,
b8p2:`It is not the person insulting or hitting you who offends you. It is your view that it is an insult. So when someone provokes you, remember that the provocation only works through your own opinion.`,
b8p5:`Look at history: empires rising and falling, again and again. Once you see the pattern, you can predict the future too. The same human story keeps repeating.`,
b9p3:`People are strange. They refuse to praise the people living right beside them, yet they desperately want praise from future generations they will never meet. Appreciate the people around you now, and stop chasing a legacy.`,
b9p4:`Do not look down on death or fear it. Accept it calmly, because it is a natural part of life, just like being born, growing up and getting older.`,
b9p5:`Adapt to the situation life has put you in, and sincerely love the people it has put you with. Not the life you imagined, the one you actually have.`,
b10p3:`Not "your life is worthless." He means: look at the endless time before you were born and after you die. Your life is tiny next to it. So do not cling to it desperately or grip it with fear. Hold it lightly and use it well.`,
b10p5:`Stop talking about what a good person should be like. Just be one. (He says it twice in this book because he needed to hear it twice.)`,
b10p6:`If you fear death, you fear one of two things: feeling nothing, or feeling something different. If you feel nothing, nothing can hurt you. If you feel something different, you are a different kind of living thing, and you have not stopped living. Either way, the fear is bigger than the thing.`,
b11p4:`When you resent what happens, you turn yourself into something like a tumour on the universe: a part fighting the body it belongs to. Being angry at reality cuts you off from nature. Acceptance reconnects you.`,
b11p5:`People do wrong things because they think those things are good for them. When you get furious at them, you are basically demanding they stop chasing what looks good to them. That is a harsh demand. Understand the mistake instead of raging at it.`,
b12p1:`The things you are trying to reach by some long, roundabout route (peace, freedom, a good life) you could have right now, if you would stop denying them to yourself. You do not have to earn calm "after" anything.`,
b12p3:`Each of us gets a tiny slice of endless time, and it is swallowed up very quickly. Use your slice on what matters.`,
'r1.11':`From his teacher Fronto he learned to recognise what envy, two-facedness and hypocrisy look like in powerful people, and that rich, high-born families are often cold to their own children. Lesson: status does not make people good, and power shows who someone really is.`,
'r3.5':`Be cheerful, and do not depend on other people's help or reassurance to feel calm. Stand on your own two feet instead of being propped up by others.`,
'r3.6':`If you ever find something in life better than justice, truth, self-control and courage, and better than a mind at peace with acting rightly, then go for it with everything. His point: you will not find anything better. So make these your priorities.`,
'r4.32':`Picture life a hundred years before Marcus: people marrying, raising kids, getting sick, dying, fighting, partying, trading, farming, flattering, scheming, complaining, chasing money and power. All of those lives are gone now. Ours are the same scene with new actors. Do not take the drama so seriously.`,
'r5.16':`Your regular thoughts become your character, the way wool soaks up dye. Think anxious or bitter thoughts all day and your mind turns that colour. Choose the thoughts you soak in.`,
'r6.2':`If you are doing the right thing, it should not matter whether you are cold or warm, sleepy or rested, criticised or praised, or even dying. Your duty does not wait for perfect conditions or applause.`,
'r7.47':`Look up at the stars and imagine moving along with them. Think about how everything in nature keeps changing into something else. Thoughts like that wash off the grime of petty, everyday worries.`,
'r7.18':`Afraid of change? Nothing can happen without it. You cannot have a hot bath unless wood burns, and you cannot be fed unless food is broken down. Every good thing in your life needed something to change.`,
'r10.34':`Marcus quotes the poet Homer: people are like leaves. The wind scatters one generation and a new one grows. Your children are leaves, and so are the people praising or cursing you. Do not let their words shake you; they fall too.`,
'r11.29':`You cannot set rules for others in writing or reading (or anywhere) until you have learned to follow rules yourself. Lead by example first.`,
'r12.36':`The final words of the whole book. When your time is up, leave without bitterness. Nature, which is ending your part, is not angry with you. Go calmly, the way a guest leaves a good meal.`
};
for(var i=0;i<BOOKS.length;i++){
  var ps=BOOKS[i].passages;
  for(var j=0;j<ps.length;j++){
    var p=ps[j];if(p.ex)continue;
    var t=PLAIN[p.id]||(p.ref?PLAIN['r'+p.ref]:null);
    if(t)p.ex=t;
  }
}
})();
