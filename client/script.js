document.getElementById('calcBtn').addEventListener('click', () => {
    value = document.getElementById('amountInput').value;
    callApi(Number(value));
});

function callApi(userVal) {
    let resList = {};
    if (typeof userVal === 'number' && userVal !== 0) {

        fetch('thirtyFive')
            .then((res) => {
                return res = res.text();
            })
            .then((thirtyFive) => {
                resList.thirtyFive = parseFloat(thirtyFive);

                fetch('hundred')
                    .then((res) => {
                        return res = res.text();
                    })
                    .then((hundred) => {
                        resList.hundred = parseFloat(hundred);

                        fetch('allShare')
                            .then((res) => {
                                return res = res.text();
                            })
                            .then((allShare) => {
                                resList.allShare = parseFloat(allShare);
                              
                                calcResults(userVal, resList);
                            })
                    })
            })
        // calcResults(userVal, {
        //     thirtyFive: [20, 40, 50],
        //     hundred: [10, 50, 80],
        //     rest: [20, 30, 40]
        // });
    }

}

function calcResults(userVal, fromApi) {

    let aResult = userVal + ((userVal / 100) * fromApi.thirtyFive);
    let bResult = userVal + ((userVal / 100) * fromApi.hundred);
    let cResult = userVal + ((userVal / 100) * fromApi.allShare);

    results = [aResult, bResult, cResult]
    displayRes(results);
}

function displayRes(results) {
    document.querySelector('#resultsArea').style.display = 'block';
    let divs = document.querySelectorAll('.resultDiv');
    for (i = 0; i < divs.length; i++) {
        divs[i].innerHTML = `<p>12 month: ${(results[i]).toFixed(2)}</p>`
    }
    // <br> <p>3 month: ${(results[i] * 3).toFixed(2)}</p><br> <p> 6 month: ${(results[i] * 6).toFixed(2)}</p>
}
