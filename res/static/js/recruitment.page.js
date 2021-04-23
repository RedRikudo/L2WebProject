async function setApplicationStatus(applicationID, status) {
  const resp = await fetch(
    `/api/applications/${applicationID}/accept/${status}`
  ).then(r => r.json())
  if (resp.status === 'ERROR') return notify(resp.message, 'error')
  if (resp.status !== 'OK') return notify('bruh wtf', 'error')
  notify(`La candidature a été ${status === 1 ? 'acceptée' : 'refusée'}`, 'ok')
  const applicationDOM = document
    .getElementById('applications')
    .querySelector('.application.id' + applicationID)

  applicationDOM.classList.remove('status0')
  applicationDOM.classList.add('status' + status)
}

onLoginEvents.push(() => {
  console.log(myNickname)
  console.log(recruiterNickname)
  if (myNickname === recruiterNickname)
    Array.from(document.getElementById('applications').children).forEach(c => {
      c?.querySelector('.selectors').classList.remove('hidden')
    })
})
onDisconnectEvents.push(() => {
  Array.from(document.getElementById('applications').children).forEach(c => {
    c?.querySelector('.selectors').classList.add('hidden')
  })
})
