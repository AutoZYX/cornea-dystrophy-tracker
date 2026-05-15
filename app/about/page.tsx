export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="panel p-6">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--teal)]">About</p>
        <h1 className="text-4xl font-semibold">为什么做这个平台</h1>
        <p className="mt-5 leading-8 text-[var(--muted)]">
          角膜营养不良是一类少见但影响长期生活质量的遗传性眼病。患者和家属常面对三个问题：
          病名复杂、治疗路径分散、家庭病史很难持续记录。这个平台把公共知识和私人记录分开，
          前者可检索、可引用、可问答，后者默认只保存在用户本地。
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">公共资料有证据链</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            每条记录标注来源、证据等级、核验日期和医学边界。
          </p>
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">个人记录不上云</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            v1 使用浏览器本地存储，支持导出，避免无意托管健康数据。
          </p>
        </div>
        <div className="panel p-5">
          <h2 className="text-xl font-semibold">问答不做诊断</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            AI 只解释公共知识库，不给个体处方或手术选择。
          </p>
        </div>
      </section>
    </div>
  );
}
