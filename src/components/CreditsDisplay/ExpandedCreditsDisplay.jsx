function ExpandedCredits() {
    function DisableOverlay() {
        const blackout = document.querySelector('.blackout');
        if (blackout) {
            blackout.style.display = 'none';
        }
    }

    return (
        <div className='blackout'>
            <div className='expanded-con'>
                <button className="expanded-con-button" value='back' onClick={() => DisableOverlay()} > Back </button>
                <h3 className="extras-title">Other</h3>
                <div className="extra-text-con">
                    <hr />
                    Levels in this list are provided by the members of the Karma Farm Discord server. 
                    <b> Extreme demons are ordered by their position on <a href="https://aredl.net" target="_blank">AREDL</a>. </b>
                    <b> Other demon levels are ranked by rating on <a href="https://gdladder.com/" target="_blank">GDDL</a>. </b>
                    Positions of demon rated levels cannot be changed if you disagree with their positions. 
                    <b> I cannot change these rankings, so please do not try and ask me to. </b>
                    If you have any suggestions, or find any bugs, please DM me on discord. 
                    <hr />
                    Extreme Demon Rankings provided by <a href="https://aredl.net" target="_blank">AREDL</a> <br />
                    Demon Tiers provided by <a href="https://gdladder.com/" target="_blank">GDDL</a> <br />
                    Level thumbnails provided by cdc's <a href='https://github.com/cdc-sys/level-thumbnails' target="_blank">Level Thumbnails Mod</a> <br />
                    <br />
                    Made in <a href="https://react.dev/" target="_blank">React</a> + <a href="https://vite.dev/n" target="_blank">Vite</a> 
                </div>
            </div>
        </div>
    )
}

export default ExpandedCredits