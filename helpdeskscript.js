function handleHelpdeskRequest(e) {
  var responses = e.values;

  var name = responses[1];
  var email = responses[2];
  var issue = responses[3];

  var status = "Open";

  // Send confirmation email
  var subject = "Helpdesk Ticket Created";
  var message = "Hi " + name + ",\n\n" +
                "Your request has been received:\n" +
                issue + "\n\n" +
                "Our team will get back to you shortly.\n\n" +
                "Thanks";

  MailApp.sendEmail(email, subject, message);

  // Send Slack notification
  sendSlackMessage(name, issue);
}

function sendSlackMessage(name, issue) {
  var url = "slackurl";

  var payload = {
    text: "🛠️ New Helpdesk Request\n\n👤 Name: " + name +
          "\n❗ Issue: " + issue +
          "\n📌 Status: Open"
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
