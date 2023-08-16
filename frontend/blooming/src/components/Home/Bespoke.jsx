import classes from "./Bespoke.module.css"

export default function Bespoke() {
  const handleClick = () => {
    window.location.href = 'https://www.samsung.com/sec/store-model/bespokeweddingclub/?cid=sec_paid_display_instafeed_multi_ecommerce_bespokeweddingclub2023_banner_20230704-B-Brand_integration&utm_source=instafeed&utm_medium=display&utm_campaign=bespokeweddingclub2023&utm_content=20230704-B-Brand&utm_term=integration&fbclid=PAAabOGgcaQuEsho8-zSWBfzUFn3wRBZ4OvR2v02ipNrejsY1_al6up9iKv8E_aem_AfHSRRvwZIAhNKEbsoggBX-LQuXZGarqfIRb4BJF4McAkOGaAbRIOAtyFwdovXcgeVoiuokVXUf5ugJHCysgOIUg'
  }
  
  return (
    <div className={classes.container}>
      <div>
        <img src="/src/assets/samsung.png" alt="samsung" onClick={handleClick}/>
      </div>
    </div>
  )
}
