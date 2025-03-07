
export default function LoadingLogin({ title }: { title: string }) {
     return (
          <>
               <div className="nebula"></div>
               <div className="glass-panel1 flex-col">
                    <div className="space-particles">
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                    </div>

                    <div className="space-loader">
                         <div className="loader-ring"></div>
                         <div className="loader-ring"></div>
                         <div className="loader-ring"></div>
                         <div className="loader-core"></div>
                    </div>
                    <br/>
                    <div className="text-white font-bold text-xl text-dark-mode-label">{title}</div>
               </div>
          </>
     );
}
