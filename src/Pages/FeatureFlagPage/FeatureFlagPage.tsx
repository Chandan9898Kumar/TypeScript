import Feature from "../../Components/FeatureFlag/FeatureFlag";
const FeatureFlagPage = () => {
  return (
    <section>
      <h2>Your Subscription</h2>
      <div className="wrapper">
        <Feature feature="free">
          <FreePlan />
        </Feature>
        <Feature feature="pro">
          <ProPlan />
        </Feature>
        <Feature feature="enterprise">
          <EnterprisePlan />
        </Feature>
      </div>
    </section>
  );
};

export default FeatureFlagPage;

export const FreePlan = () => (
  <div className="card free-plan">
    <h2>Free Plan</h2>
    <p>Get started with basic features for free.</p>
  </div>
);

export const ProPlan = () => (
  <div className="card pro-plan">
    <h2>Pro Plan</h2>
    <p>Unlock advanced features for professionals.</p>
  </div>
);

export const EnterprisePlan = () => (
  <div className="card enterprise-plan">
    <h2>Enterprise Plan</h2>
    <p>Customized solutions for your business needs.</p>
  </div>
);
