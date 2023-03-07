# Optimized Multi Language API

This repo is hosting my sample multi language api which contains posts and tags associated with them in multiple languages.

# Dependencies

- NodeJS
- MySQL DB server
- Sequelize (ORM library)

# How it works

The main reason for this repo is to show how upsert functionality of MySQL can be used for query optimization. This API supports entries with missing languages and to be able to update the language it uses upsert queries. Upsert allows us to create the entry if it was not created, or update the existing one if it's already in the database.
<br>
In the models directory, we can see that there's both post and postTr tables. The postTr table contains the translations of posts in all languages. However the postTr table contains composite primary key to allow for upsert operations. The primary key there is composed of languageId and postId. With that design, next time a translation needs to be added / updated, all we do is perform an upsert operation on the specific entry by passing language and post id. If that entry already exists, that will create a key conflict which will cause an update operation. If it doesnt exists, it will be created (That's how upsert works).

Generated SQL query will be like the following

```sql
insert into postTr (languageId, postId, text) values ('..', '..', '..') on duplicate key update text = values(text);
```

Without that design, we'd have to send 1 select query to decide whether we need to do an update or insert and another query to do the update or insert. However, with this design, we can accomplish the same functionality with only one DB call.

# Notes

Note that this api does not perform implementation in controllers and it doesn't have any validation logic. However, the reason I'm putting it out is to give fellow backend developers and idea to develop optimized multi langauge databases.
